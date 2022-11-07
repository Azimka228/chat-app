import { injectable } from 'inversify'
import { Dialog, DialogModel, User } from '../models'
import { modelFieldsName, userFieldsName } from '../const'

@injectable()
export class DialogService {
  async get(user: User): Promise<readonly Dialog[]> {
    return await DialogModel.find({ users: user._id })
      .select(modelFieldsName)
      .populate([
        { path: 'users', select: userFieldsName },
        { path: 'messages', select: modelFieldsName },
      ])
      .exec()
  }

  async getById(user: User, id: string): Promise<Dialog | null> {
    return await DialogModel.findById(id)
      .findOne({ users: user._id })
      .select(modelFieldsName)
      .populate([
        { path: 'users', select: userFieldsName },
        { path: 'messages', select: modelFieldsName },
      ])
      .exec()
  }
}
