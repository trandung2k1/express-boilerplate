import { IUserPayload } from '@/types/user'
import jwt from 'jsonwebtoken'

export type IJwtPayload = jwt.JwtPayload & IUserPayload
