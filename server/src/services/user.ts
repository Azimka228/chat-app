import { User, UserModel } from '../models'
import { userFieldsName } from '../const'
import mongoose from 'mongoose'
import { injectable } from 'inversify'

@injectable()
export class UserService {
  async get(): Promise<ReadonlyArray<User & mongoose.Document & { _id: mongoose.Types.ObjectId }>> {
    return await UserModel.find().select(userFieldsName).exec()
  }

  async getByID(
    id: string,
  ): Promise<(User & mongoose.Document & { _id: mongoose.Types.ObjectId }) | null> {
    return await UserModel.findById(id).select(userFieldsName).exec()
  }
}
