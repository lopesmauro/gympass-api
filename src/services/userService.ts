import prisma from "../database/prismaClient"
import { generateHash, compareHash } from "../security/hash"
import { Pick } from '@prisma/client/runtime/library'
import { User, Role } from '@prisma/client'

const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email) as Pick<User, 'id' | 'email' | 'password' | 'role'>
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
            password: hashedPassword,
        }
    })
    return user
}

const createAdmin = async (name: string, email: string, password: string) => {
    const adminCout = await prisma.user.count({
        where: {
            role: 'ADMIN'
        }
    })
    let role: Role = Role.USER
    if (adminCout === 0) {
        role = Role.ADMIN
        const hashedPassword = await generateHash(password)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        })
        return user
    }
    return false
}

export {
    createUser,
    createAdmin,
    findUserByEmail,
    loginUser
}