import { FastifyReply, FastifyRequest } from "fastify";

const isAdmin = (request: FastifyRequest, reply: FastifyReply) => {
    const role = request.user?.role
    if(role != 'ADMIN') {
        return reply.status(403).send({error: 'Unauthorized access.'})
    }
}

export { isAdmin }