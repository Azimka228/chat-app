import { User } from '../user'
import { Message } from '../mesage'

export interface Dialog {
  users: User[]
  messages: Message[]
}
