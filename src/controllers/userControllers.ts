import { FastifyReply, FastifyRequest } from 'fastify'
import { createUser, findUserByEmail } from '../services/userService';

const register = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email, password } = request.body as { name: string; email: string; password: string }
    
    if (!name || !email || !password) {
        return reply.status(400).send({ error: 'Name, email and password are required' })
    }

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
        return reply.status(400).send({ error: 'User already exists' })
    }

    await createUser(name, email, password)
    return reply.status(201).send({ message: 'User registered successfully' })
}

const login = async (request: FastifyRequest, reply: FastifyReply) => {
    
}

const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
    
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
    getProfile,
    getCheckInsHistory,
    getCheckInsCount,
    updateProfile,
    deleteUser
}

