import { Container } from 'inversify'
import { AuthService, DialogService, MessageService, UserService } from '../services'
import { identifiers } from './identifiers'
import { BaseMiddleware } from 'inversify-express-utils'
import { AuthMiddleware } from '../middleware/auth'

export const iocBuild = (container: Container): void => {
  container.bind<AuthService>(identifiers.AuthService).to(AuthService)
  container.bind<UserService>(identifiers.UserService).to(UserService)
  container.bind<DialogService>(identifiers.DialogService).to(DialogService)
  container.bind<MessageService>(identifiers.MessageService).to(MessageService)

  container.bind<BaseMiddleware>(identifiers.AuthMiddleware).to(AuthMiddleware)
}
