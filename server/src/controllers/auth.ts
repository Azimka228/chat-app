import express from 'express'
import { User } from '../models'
import { SignInDto, SignUpDto } from '../dto'
import { createCookie, createToken } from '../help/user'
import { controller, httpPost, interfaces, request, response } from 'inversify-express-utils'
import { identifiers } from '../ioc'
import { AuthService, UserService } from '../services'
import { inject } from 'inversify'
import validationMiddleware from '../middleware/validation'

@controller('/auth')
export class AuthController implements interfaces.Controller {
  constructor(
    @inject(identifiers.AuthService) private readonly _authService: AuthService,
    @inject(identifiers.UserService) private readonly _userService: UserService,
  ) {}

  @httpPost('/sign-in', validationMiddleware(SignInDto))
  private async signIn(
    @request() req: express.Request,
    @response() res: express.Response,
  ): Promise<void> {
    const dataReq = req.body as SignInDto

    const user = (await this._authService.signIn(dataReq)) as User
    const tokenData = createToken(user)
    res.setHeader('Set-Cookie', [createCookie(tokenData)])
    res.sendStatus(204)
  }

  @httpPost('/sign-up', validationMiddleware(SignUpDto))
  private async signUp(
    @request() req: express.Request,
    @response() res: express.Response,
  ): Promise<void> {
    const dataReq = req.body as SignUpDto

    const user = await this._authService.signUp(dataReq)

    const tokenData = createToken(user)
    res.setHeader('Set-Cookie', [createCookie(tokenData)])
    res.sendStatus(204)
  }

  @httpPost('/sign-out')
  private signOut(@response() res: express.Response): void {
    res.setHeader('Set-Cookie', ['Authorization=;Max-age=0'])
    res.sendStatus(204)
  }
}
