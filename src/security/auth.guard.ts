import { FastifyReply, FastifyRequest } from 'fastify'
import { verifyToken } from '../security/jwt'

const authGuard = async (request: FastifyRequest, reply: FastifyReply) => {
    const headerToken = request.headers['authorization']
    if (!headerToken || !headerToken.startsWith('Bearer ')) {
        return reply.status(401).send({ error: 'Unauthorized' })
    }
    const token = headerToken.split(' ')[1]
    try {
        const decoded = verifyToken(token)
        if (!decoded || typeof decoded === 'string') {
            return reply.status(401).send({ error: 'Invalid token' })
        }
        if (decoded instanceof Error) {
            return reply.status(401).send({ error: decoded.message })
        }
        request.user = decoded
        return
    } catch (error) {
        return reply.status(401).send({ error: 'Invalid token' })
    }
}

export { authGuard } 