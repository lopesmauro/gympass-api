import prisma from "../database/prismaClient"

const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email }
    });
};

const createUser = async (name: string, email: string, password: string) => {
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })

    return user
}

export {
    createUser,
    findUserByEmail
}