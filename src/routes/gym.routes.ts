import {FastifyInstance} from "fastify"
import { authGuard } from "../security/auth.guard"
import { isAdmin } from "../security/isAdmin"
import { gymControllers } from "../controllers/gymController"

export default async function (fastify: FastifyInstance) {
    fastify.post('/gym', {preHandler: [authGuard, isAdmin]}, gymControllers.registerGym)
}

