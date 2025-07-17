import bcrypt from 'bcrypt'

const generateHash = async (password: string) => {
    return bcrypt.hash(password, 10)
}

const compareHash = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash)
} 

export { generateHash, compareHash }