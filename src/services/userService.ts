import prisma from "../database/prismaClient"
import { generateHash, compareHash } from "../security/hash"
import { Role } from '@prisma/client'

const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email)
    if (!user || !(await compareHash(password, user.password))) {
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
    const userCount = await prisma.user.count()
    let role: Role = Role.USER
    if (userCount === 0) {
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
