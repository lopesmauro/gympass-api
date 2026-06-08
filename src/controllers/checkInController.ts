import { FastifyReply, FastifyRequest } from 'fastify'
import { createCheckIn, validateCheckIn } from '../services/checkInService'

const registerCheckIn = async (request: FastifyRequest, reply: FastifyReply) => {
    const { gymId } = request.params as { gymId: string }
    const { latitude, longitude } = request.body as { latitude: number; longitude: number }
    const userId = request.user?.id

    if (!userId) {
        return reply.status(401).send({ error: 'Unauthorized' })
    }

    if (!gymId || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return reply.status(400).send({ error: 'Gym, latitude and longitude are required' })
    }

    const result = await createCheckIn(userId, gymId, latitude, longitude)

    if (result.error === 'Gym not found') {
        return reply.status(404).send({ error: result.error })
    }

    if (result.error) {
        return reply.status(400).send({ error: result.error })
    }

    return reply.status(201).send(result.checkIn)
}

const validateUserCheckIn = async (request: FastifyRequest, reply: FastifyReply) => {
    const { checkInId } = request.params as { checkInId: string }

    if (!checkInId) {
        return reply.status(400).send({ error: 'Check-in is required' })
    }

    const result = await validateCheckIn(checkInId)

    if (result.error === 'Check-in not found') {
        return reply.status(404).send({ error: result.error })
    }

    if (result.error) {
        return reply.status(400).send({ error: result.error })
    }

    return reply.status(200).send(result.checkIn)
}

export const checkInControllers = {
    registerCheckIn,
    validateUserCheckIn,
}
