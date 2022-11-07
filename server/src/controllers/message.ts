import { Message } from '../models'
import { MessageDialogIdDto, MessageUserIdDto } from '../dto'
import RequestWithUser from '../interfaces/request-with-user'
import { controller, httpPost, interfaces, request, requestBody } from 'inversify-express-utils'
import { inject } from 'inversify'
import { identifiersMiddleware, identifiersService } from '../ioc'
import { MessageService } from '../services'
import validationMiddleware from '../middleware/validation'

@controller('/message')
export class MessageController implements interfaces.Controller {
  constructor(
    @inject(identifiersService.MessageService) private readonly _messageService: MessageService,
  ) {}

  @httpPost('/user', identifiersMiddleware.AuthMiddleware, validationMiddleware(MessageUserIdDto))
  private async create(
    @request() req: RequestWithUser,
    @requestBody() messageDto: MessageUserIdDto,
  ): Promise<Message> {
    return await this._messageService.createByUser(req.user, messageDto)
  }

  @httpPost('/dialog', identifiersMiddleware.AuthMiddleware, validationMiddleware(MessageDialogIdDto))
  private async createByDialog(
    @request() req: RequestWithUser,
    @requestBody() messageDto: MessageDialogIdDto,
  ): Promise<Message> {
    return await this._messageService.createByDialog(req.user, messageDto)
  }
}
