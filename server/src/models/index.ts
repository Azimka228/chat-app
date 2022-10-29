import { Schema, model } from 'mongoose'
import { User } from '../types'

const userSchema = new Schema<User>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
})

export const UserModel = model('user', userSchema)
