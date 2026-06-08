import prisma from "../database/prismaClient"
import { getDistanceBetweenCoordinates } from "./checkInService"

const ITEMS_PER_PAGE = 20
const NEARBY_DISTANCE_IN_KM = 10

const createGym = async (name: string, latitude: number, longitude: number) => {
    return prisma.gym.create({
        data: {
            name,
            latitude,
            longitude,
        }
    })
}

const searchGymsByName = async (query: string, page: number) => {
    return prisma.gym.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive'
            }
        },
        orderBy: {
            name: 'asc'
        },
        take: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE
    })
}

const searchNearbyGyms = async (latitude: number, longitude: number, page: number) => {
    const gyms = await prisma.gym.findMany()

    return gyms
        .map((gym) => ({
            ...gym,
            distance: getDistanceBetweenCoordinates(
                { latitude, longitude },
                { latitude: Number(gym.latitude), longitude: Number(gym.longitude) }
            )
        }))
        .filter((gym) => gym.distance <= NEARBY_DISTANCE_IN_KM)
        .sort((a, b) => a.distance - b.distance)
        .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
}

export { createGym, searchGymsByName, searchNearbyGyms }
