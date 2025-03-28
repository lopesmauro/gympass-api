import {FastifyInstance} from "fastify"
import {userControllers} from "../controllers/userControllers"
//import { authMiddleware } from "../middlewares/authMiddleware"

export default async function (fastify: FastifyInstance) {
    fastify.post('/users/register', userControllers.register);
    fastify.post('/users/login', userControllers.login);
    fastify.get('/users/profile', userControllers.getProfile);
    fastify.get('/users/checkins', userControllers.getCheckInsHistory);
    fastify.get('/users/checkins/count', userControllers.getCheckInsCount);
    fastify.put('/users/profile', userControllers.updateProfile);
    fastify.delete('/users', userControllers.deleteUser);
}
