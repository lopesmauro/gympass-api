import jwt from 'jsonwebtoken'

interface JwtPayload {
    id: string
    email: string
}

const generateToken = (payload: JwtPayload): string => {
    const secretKey = process.env.JWT_SECRET_KEY as string
    return jwt.sign(payload, secretKey, {
        expiresIn: '1h'    
    })
}

const verifyToken = (token: string): JwtPayload | Error  => {
    const secretKey = process.env.JWT_SECRET_KEY as string
    try{
        return jwt.verify(token, secretKey) as JwtPayload
    } catch (e: unknown) {
        if (e instanceof Error) {
            return new Error('Invalid token')
        }
        return new Error('Unknown error')
    }
}

export { generateToken, verifyToken }