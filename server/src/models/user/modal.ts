import { model, Schema, Document } from 'mongoose'
import { User } from './inteface'

const userSchema = new Schema<User & Document>({
  nickName: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  }
})

export const UserModel = model('user', userSchema)
