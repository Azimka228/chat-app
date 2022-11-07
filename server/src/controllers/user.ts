import express from 'express'
import RequestWithUser from '../interfaces/request-with-user'
import { User } from '../models'
import {
  controller,
  httpGet,
  interfaces,
  request,
  requestParam,
  response,
} from 'inversify-express-utils'
import { inject } from 'inversify'
import { identifiers } from '../ioc'
import { UserService } from '../services'

@controller('/user')
export class UserController implements interfaces.Controller {
  constructor(@inject(identifiers.UserService) private readonly _userService: UserService) {}

  @httpGet('/my', identifiers.AuthMiddleware)
  private my(@request() req: RequestWithUser, @response() res: express.Response): User {
    return req.user
  }

  @httpGet('/', identifiers.AuthMiddleware)
  private async users(): Promise<readonly User[]> {
    return await this._userService.get()
  }

  @httpGet('/:id', identifiers.AuthMiddleware)
  private async userById(@requestParam('id') id: string): Promise<User | null> {
    return await this._userService.getByID(id)
  }
}
