import prisma from "../database/prismaClient"

const createGym = async (name: string, latitude: number, longitude: number) => {
    return prisma.gym.create({
        data: {
            name,
            latitude,
            longitude,
        }
    })
}

export { createGym }