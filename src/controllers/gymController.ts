import { FastifyReply, FastifyRequest } from 'fastify'
import { createGym } from '../services/gymService'

const registerGym = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, latitude, longitude } = request.body as { name: string; latitude: number; longitude: number }

    if (!name || !latitude || !longitude) {
        return reply.status(400).send({ error: 'Missing required fields' })
    }

    try {
        const gym = await createGym(name, latitude, longitude)
        return reply.status(201).send(gym)
    } catch (error) {
        console.error('Error creating gym:', error)
        return reply.status(500).send({ error: 'Internal server error' })
    }
}

export const gymControllers = {
    registerGym,
}