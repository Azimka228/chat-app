import { User } from '../user'
import { Dialog } from '../dialog'

export interface Message {
  _id: string
  body: string
  created: Date
  sender: User
  dialog: Dialog
}
