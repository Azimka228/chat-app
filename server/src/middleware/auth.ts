import { Response, NextFunction } from 'express'
import RequestWithUser from '../interfaces/request-with-user'
import UnauthorizedException from '../exceptions/unauthorized'
import HttpException from '../exceptions/http-exception'
import { UserModel } from '../models'
import jwt from 'jsonwebtoken'
import { isNil } from 'ramda'
import { DataStoredInToken } from '../types'
import { userFieldsName } from '../const'

function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction): void {
  const cookies = request.cookies
  if (cookies?.Authorization !== null) {
    const secret = process.env.JWT_SECRET ?? '123'
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken
      const id = verificationResponse._id
      void UserModel.findById(id)
        .select(userFieldsName)
        .exec()
        .then((user) => {
          if (!isNil(user)) {
            request.user = user
            next()
          } else {
            next(new HttpException(401, 'Wrong authentication token'))
          }
        })
    } catch {
      next(new HttpException(401, 'Wrong authentication token'))
    }
  } else {
    next(new UnauthorizedException())
  }
}

export default authMiddleware
