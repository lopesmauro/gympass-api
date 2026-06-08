import prisma from "../database/prismaClient"

const ITEMS_PER_PAGE = 20
const MAX_CHECK_IN_DISTANCE_IN_KM = 0.1
const MAX_VALIDATION_TIME_IN_MINUTES = 20

const getDistanceBetweenCoordinates = (
    from: { latitude: number; longitude: number },
    to: { latitude: number; longitude: number }
) => {
    const earthRadiusInKm = 6371
    const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180

    const latitudeDistance = degreesToRadians(to.latitude - from.latitude)
    const longitudeDistance = degreesToRadians(to.longitude - from.longitude)

    const a =
        Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
        Math.cos(degreesToRadians(from.latitude)) *
            Math.cos(degreesToRadians(to.latitude)) *
            Math.sin(longitudeDistance / 2) *
            Math.sin(longitudeDistance / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return earthRadiusInKm * c
}

const getTodayRange = () => {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(startOfDay)
    endOfDay.setDate(endOfDay.getDate() + 1)

    return { startOfDay, endOfDay }
}

const createCheckIn = async (
    userId: string,
    gymId: string,
    userLatitude: number,
    userLongitude: number
) => {
    const gym = await prisma.gym.findUnique({
        where: { id: gymId }
    })

    if (!gym) {
        return { error: 'Gym not found' }
    }

    const { startOfDay, endOfDay } = getTodayRange()
    const checkInOnSameDay = await prisma.checkIn.findFirst({
        where: {
            userId,
            createdAt: {
                gte: startOfDay,
                lt: endOfDay
            }
        }
    })

    if (checkInOnSameDay) {
        return { error: 'User already checked in today' }
    }

    const distance = getDistanceBetweenCoordinates(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: Number(gym.latitude), longitude: Number(gym.longitude) }
    )

    if (distance > MAX_CHECK_IN_DISTANCE_IN_KM) {
        return { error: 'User is too far from the gym' }
    }

    const checkIn = await prisma.checkIn.create({
        data: {
            userId,
            gymId
        }
    })

    return { checkIn }
}

const getCheckInsHistory = async (userId: string, page: number) => {
    return prisma.checkIn.findMany({
        where: { userId },
        include: {
            gym: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE
    })
}

const getCheckInsCount = async (userId: string) => {
    return prisma.checkIn.count({
        where: { userId }
    })
}

const validateCheckIn = async (checkInId: string) => {
    const checkIn = await prisma.checkIn.findUnique({
        where: { id: checkInId }
    })

    if (!checkIn) {
        return { error: 'Check-in not found' }
    }

    const validationLimit = new Date(checkIn.createdAt)
    validationLimit.setMinutes(validationLimit.getMinutes() + MAX_VALIDATION_TIME_IN_MINUTES)

    if (validationLimit < new Date()) {
        return { error: 'Check-in can only be validated up to 20 minutes after creation' }
    }

    const validatedCheckIn = await prisma.checkIn.update({
        where: { id: checkInId },
        data: {
            validatedAt: new Date()
        }
    })

    return { checkIn: validatedCheckIn }
}

export {
    createCheckIn,
    getCheckInsHistory,
    getCheckInsCount,
    validateCheckIn,
    getDistanceBetweenCoordinates
}
