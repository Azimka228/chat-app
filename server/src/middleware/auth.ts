import express from 'express'
import RequestWithUser from '../interfaces/request-with-user'
import UnauthorizedException from '../exceptions/http/unauthorized'
import HttpException from '../exceptions/http/http-exception'
import { UserModel } from '../models'
import jwt from 'jsonwebtoken'
import { isNil } from 'ramda'
import { DataStoredInToken } from '../types'
import { userFieldsName } from '../const'
import { BaseMiddleware } from 'inversify-express-utils'
import { injectable } from 'inversify'

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  handler(req: RequestWithUser, res: express.Response, next: express.NextFunction): void {
    const cookies = req.cookies
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
              req.user = user
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
}
