import {FastifyInstance} from "fastify"
import {userControllers} from "../controllers/userControllers"
import { authGuard } from "../security/auth.guard"

export default async function (fastify: FastifyInstance) {
    fastify.post('/users', userControllers.register)
    fastify.post('/users/login', userControllers.login)
    // fastify.get('/users/checkins', {preHandler: authGuard} , userControllers.getCheckInsHistory)
    // fastify.get('/users/checkins/count', {preHandler: authGuard} , userControllers.getCheckInsCount)
    // fastify.put('/users/profile', { preHandler: authGuard}, userControllers.updateProfile)
    // fastify.delete('/users', { preHandler: authGuard}, userControllers.deleteUser)
}
