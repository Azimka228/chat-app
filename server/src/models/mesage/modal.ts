import { model, Schema, Document } from 'mongoose'
import { Message } from './interface'


const messageSchema = new Schema<Message & Document>({
  body: {
    type: Schema.Types.String,
    required: true,
  },
  created: {
    type: Schema.Types.Date,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  dialog: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'dialog',
  },
})

export const MessageModel = model('message', messageSchema)
