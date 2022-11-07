import { User, UserModel } from '../models'
import BadRequestException from '../exceptions/http/bad-request'
import { compare, hash } from 'bcrypt'
import { SignIn, SignUp } from '../dto'
import mongoose from 'mongoose'
import { injectable } from 'inversify'

@injectable()
export class AuthService {
  async signIn(data: SignIn): Promise<User & mongoose.Document & { _id: mongoose.Types.ObjectId }> {
    const user = await UserModel.findOne({ nickName: data.nickName }).exec()

    if (user === null) {
      throw new BadRequestException()
    } else {
      const isPasswordMatching = await compare(data.password, user.password)
      if (isPasswordMatching) {
        return user
      } else {
        throw new BadRequestException()
      }
    }
  }

  async signUp(data: SignUp): Promise<User & mongoose.Document & { _id: mongoose.Types.ObjectId }> {
    const user = await UserModel.findOne({
      $or: [{ nickName: data.nickName }, { email: data.email }],
    }).exec()
    if (user !== null) {
      throw new BadRequestException()
    }
    const hashedPassword = await hash(data.password, 10)
    return await UserModel.create({
      ...data,
      password: hashedPassword,
    })
  }
}
