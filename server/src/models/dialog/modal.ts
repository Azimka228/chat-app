import { model, Schema, Document } from 'mongoose'
import { Dialog } from './interface'


const dialogSchema = new Schema<Dialog & Document>({
  users: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'message',
    }
  ]
})

export const DialogModel = model('dialog', dialogSchema)
