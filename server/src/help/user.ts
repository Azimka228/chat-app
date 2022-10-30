import { pick } from 'ramda'
import { User } from '../models'
import { Document, Types } from 'mongoose'
import { DataStoredInToken, TokenData } from '../types'
import jwt from 'jsonwebtoken'

export const getUserReturn = pick<keyof (User & Document & { _id: Types.ObjectId })>(['name', 'email'])

export function createToken(user: User & Document): TokenData {
  const expiresIn = 60 * 60 // an hour
  const secret = process.env.JWT_SECRET ?? 'secret'
  const dataStoredInToken: DataStoredInToken = {
    _id: user._id,
  }
  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
  }
}

export function createCookie(tokenData: TokenData): string {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/`
}
