import { Container } from 'inversify'
import { AuthService, DialogService, MessageService, UserService } from '../services'
import { identifiersService, identifiersMiddleware } from './identifiers'
import { BaseMiddleware } from 'inversify-express-utils'
import { AuthMiddleware } from '../middleware/auth'

export const iocBuild = (container: Container): void => {
  container.bind<AuthService>(identifiersService.AuthService).to(AuthService)
  container.bind<UserService>(identifiersService.UserService).to(UserService)
  container.bind<DialogService>(identifiersService.DialogService).to(DialogService)
  container.bind<MessageService>(identifiersService.MessageService).to(MessageService)

  container.bind<BaseMiddleware>(identifiersMiddleware.AuthMiddleware).to(AuthMiddleware)
}
