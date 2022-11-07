import RequestWithUser from '../interfaces/request-with-user'
import { Dialog } from '../models'
import { controller, httpGet, interfaces, request, requestParam } from 'inversify-express-utils'
import { isNil } from 'ramda'
import NotFoundException from '../exceptions/http/not-found'
import { inject } from 'inversify'
import { identifiersMiddleware, identifiersService } from '../ioc'
import { DialogService } from '../services'

@controller('/dialog')
export class DialogController implements interfaces.Controller {
  constructor(@inject(identifiersService.DialogService) private readonly _dialogService: DialogService) {}

  @httpGet('/', identifiersMiddleware.AuthMiddleware)
  private async dialogs(@request() req: RequestWithUser): Promise<readonly Dialog[]> {
    return await this._dialogService.get(req.user)
  }

  @httpGet('/:id', identifiersMiddleware.AuthMiddleware)
  private async dialogById(
    @request() req: RequestWithUser,
    @requestParam('id') id: string,
  ): Promise<Dialog> {
    const user = req.user

    const dialog = await this._dialogService.getById(user, id)
    if (isNil(dialog)) {
      throw new NotFoundException()
    }
    return dialog
  }
}
