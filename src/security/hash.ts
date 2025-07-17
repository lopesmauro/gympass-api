import bcrypt from 'bcrypt'

const generateHash = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10)
}

const compareHash = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash)
} 

export { generateHash, compareHash }