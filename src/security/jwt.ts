import jwt from 'jsonwebtoken'
import MyJwtPayload from '../types/jwtPayload'

const generateToken = (payload: MyJwtPayload): string => {
    const secretKey = process.env.JWT_SECRET_KEY as string
    return jwt.sign(payload, secretKey, {
        expiresIn: '1h'    
    })
}

const verifyToken = (token: string): MyJwtPayload | Error  => {
    const secretKey = process.env.JWT_SECRET_KEY as string
    try{
        return jwt.verify(token, secretKey) as MyJwtPayload
    } catch (e: unknown) {
        if (e instanceof Error) {
            return new Error('Invalid token')
        }
        return new Error('Unknown error')
    }
}

export { generateToken, verifyToken }