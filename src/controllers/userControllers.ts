import { FastifyReply, FastifyRequest } from 'fastify'
import { createUser, findUserByEmail, loginUser, createAdmin } from '../services/userService'
import { generateToken } from '../security/jwt'
import { getCheckInsCount, getCheckInsHistory } from '../services/checkInService'


const register = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email, password } = request.body as { name: string; email: string; password: string;}

    if (!name || !email || !password) {
        return reply.status(400).send({ error: 'Name, email and password are required' })
    }

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
        return reply.status(400).send({ error: 'User already exists' })
    }
    
    const admin = await createAdmin(name, email, password)
    if (!admin) {
        await createUser(name, email, password)
        return reply.status(201).send({ message: 'User registered successfully' })
    }

    return reply.status(201).send({ message: 'Admin user registered successfully' })
}

const login = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as { email: string; password: string }

    if (!email || !password) {
        return reply.status(400).send({ error: 'Email and password are required' })
    }

    const verifyLogin = await loginUser(email, password)
    if(!verifyLogin){
        return reply.status(401).send({ error: 'Invalid email or password' })
    }

    const token = generateToken({id: verifyLogin.id, email: verifyLogin.email, role: verifyLogin.role})
    return reply.status(200).send(
        {
            message: 'Login sucessful.',
            token,
            user: {
                id: verifyLogin.id,
                email: verifyLogin.email,
                role: verifyLogin.role
            }
        }
    )
}

const getUserCheckInsHistory = async (request: FastifyRequest, reply: FastifyReply) => {
    const { page = '1' } = request.query as { page?: string }
    const userId = request.user?.id

    if (!userId) {
        return reply.status(401).send({ error: 'Unauthorized' })
    }

    const parsedPage = Number(page)
    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
        return reply.status(400).send({ error: 'Page must be a positive integer' })
    }

    const checkIns = await getCheckInsHistory(userId, parsedPage)

    return reply.status(200).send(checkIns)
}

const getUserCheckInsCount = async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = request.user?.id

    if (!userId) {
        return reply.status(401).send({ error: 'Unauthorized' })
    }

    const count = await getCheckInsCount(userId)

    return reply.status(200).send({ count })
}


export const userControllers = {
    register,
    login,
    getUserCheckInsHistory,
    getUserCheckInsCount,
}
