import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import httpContext from 'express-http-context'
import redisClient from '@/configs/redis'
import { IJwtPayload } from '@/types/jwt'
import { IUserPayload } from '@/types/user'

export interface IRequest extends Request {
  user: IUserPayload
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const tokenString: string | undefined = req.headers.authorization
  if (tokenString) {
    const accessToken: string = tokenString.split(' ')[1]
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError')
          return res.status(401).json({
            message: 'Token expired',
          })
        else if (error.name === 'JsonWebTokenError') {
          return res.status(400).json({
            message: error.message,
          })
        } else {
          return res.status(400).json({
            message: error.message,
          })
        }
      } else {
        const data: IJwtPayload = decoded as IJwtPayload
        const dataStore: string | null = await redisClient.get('BL_' + data.userId.toString())
        if (dataStore == accessToken) {
          return res.status(401).json({
            message: 'Token inside blacklisted',
          })
        } else {
          const { id, isAdmin, email } = data
          const user: IUserPayload = { id, isAdmin, email }
          req.user = user
          httpContext.set('user', user)
          next()
        }
      }
    })
  } else {
    return res.status(401).json({
      message: 'Token not found',
    })
  }
}
