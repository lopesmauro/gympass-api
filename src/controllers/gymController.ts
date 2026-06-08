import { FastifyReply, FastifyRequest } from 'fastify'
import { createGym, searchGymsByName, searchNearbyGyms } from '../services/gymService'

const registerGym = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, latitude, longitude } = request.body as { name: string; latitude: number; longitude: number }

    if (!name || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
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

const searchGyms = async (request: FastifyRequest, reply: FastifyReply) => {
    const { query, page = '1' } = request.query as { query?: string; page?: string }

    if (!query) {
        return reply.status(400).send({ error: 'Query is required' })
    }

    const parsedPage = Number(page)
    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
        return reply.status(400).send({ error: 'Page must be a positive integer' })
    }

    const gyms = await searchGymsByName(query, parsedPage)

    return reply.status(200).send(gyms)
}

const nearbyGyms = async (request: FastifyRequest, reply: FastifyReply) => {
    const { latitude, longitude, page = '1' } = request.query as {
        latitude?: string
        longitude?: string
        page?: string
    }

    const parsedLatitude = Number(latitude)
    const parsedLongitude = Number(longitude)
    const parsedPage = Number(page)

    if (!Number.isFinite(parsedLatitude) || !Number.isFinite(parsedLongitude)) {
        return reply.status(400).send({ error: 'Latitude and longitude are required' })
    }

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
        return reply.status(400).send({ error: 'Page must be a positive integer' })
    }

    const gyms = await searchNearbyGyms(parsedLatitude, parsedLongitude, parsedPage)

    return reply.status(200).send(gyms)
}

export const gymControllers = {
    registerGym,
    searchGyms,
    nearbyGyms,
}
