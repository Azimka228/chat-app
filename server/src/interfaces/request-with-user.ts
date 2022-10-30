import { Request } from 'express'
import { User } from '../models'

interface RequestWithUser extends Request {
  user: User
  cookies: { Authorization: string }
}

export default RequestWithUser
