import prisma from "../database/prismaClient"
import { generateHash, compareHash } from "../security/hash"
import { Pick } from '@prisma/client/runtime/library'
import { User } from '@prisma/client'

const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email) as Pick<User, 'id' | 'email' | 'password'>
    if (!compareHash(password, user.password)) {
        return false
    }
    return user
}

const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email }
    })
}

const createUser = async (name: string, email: string, password: string) => {
    const hashedPassword = await generateHash(password)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return user
} 




export {
    createUser,
    findUserByEmail,
    loginUser
}