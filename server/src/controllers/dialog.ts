import RequestWithUser from '../interfaces/request-with-user'
import { Dialog } from '../models'
import { controller, httpGet, interfaces, request, requestParam } from 'inversify-express-utils'
import { isNil } from 'ramda'
import NotFoundException from '../exceptions/http/not-found'
import { inject } from 'inversify'
import { identifiers } from '../ioc'
import { DialogService } from '../services'

@controller('/dialog')
export class DialogController implements interfaces.Controller {
  constructor(@inject(identifiers.DialogService) private readonly _dialogService: DialogService) {}

  @httpGet('/', identifiers.AuthMiddleware)
  private async dialogs(@request() req: RequestWithUser): Promise<readonly Dialog[]> {
    return await this._dialogService.get(req.user)
  }

  @httpGet('/:id', identifiers.AuthMiddleware)
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
