import { Document } from 'mongoose'

export interface TokenData {
  token: string
  expiresIn: number
}

export type DataStoredInToken = Pick<Document, '_id'>
