import { FastifyInstance } from "fastify"
import { checkInControllers } from "../controllers/checkInController"
import { authGuard } from "../security/auth.guard"
import { isAdmin } from "../security/isAdmin"

export default async function (fastify: FastifyInstance) {
    fastify.post('/gyms/:gymId/check-ins', { preHandler: authGuard }, checkInControllers.registerCheckIn)
    fastify.patch('/check-ins/:checkInId/validate', { preHandler: [authGuard, isAdmin] }, checkInControllers.validateUserCheckIn)
}
