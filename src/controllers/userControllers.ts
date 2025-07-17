import { FastifyReply, FastifyRequest } from 'fastify'
import { createUser, findUserByEmail, loginUser, createAdmin } from '../services/userService'
import { generateToken } from '../security/jwt';

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

    if (!email || !!password) {
        return reply.status(400).send({ error: 'Email and password are required' })
    }

    const verifyLogin = await loginUser(email, password)
    if(!verifyLogin){
        return reply.status(401).send({ error: 'Invalid email or password' })
    }

    const token = generateToken({id: verifyLogin.id, email: verifyLogin.email})
    return reply.status(200).send({message: 'Login sucessful.', token})
}


const getCheckInsHistory = async (request: FastifyRequest, reply: FastifyReply) => {

}

const getCheckInsCount = async (request: FastifyRequest, reply: FastifyReply) => {

}

const updateProfile = async (request: FastifyRequest, reply: FastifyReply) => {

}

const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {

}

export const userControllers = {
    register,
    login,
    getCheckInsHistory,
    getCheckInsCount,
    updateProfile,
    deleteUser
}

