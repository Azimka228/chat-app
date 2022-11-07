import { injectable } from 'inversify'
import { DialogModel, Message, MessageModel, User, UserModel } from '../models'
import { MessageDialogIdDto, MessageUserIdDto } from '../dto'
import { isNil } from 'ramda'
import NotFound from '../exceptions/http/not-found'
import BadRequestException from '../exceptions/http/bad-request'

@injectable()
export class MessageService {
  async createByUser(user: User, messageDto: MessageUserIdDto): Promise<Message> {
    const dialog = await DialogModel.findOne({ users: [user._id, messageDto.toId] }).exec()
    if (isNil(dialog)) {
      const recipient = await UserModel.findById(messageDto.toId).exec()
      if (isNil(recipient)) {
        throw new NotFound()
      } else {
        const newDialog = await DialogModel.create({
          users: [user._id, messageDto.toId],
          messages: [],
        })
        const newMessage = await MessageModel.create({
          body: messageDto.body,
          created: new Date(),
          sender: user._id,
          dialog: newDialog._id,
        })
        newDialog.messages = [newMessage._id]
        await newDialog.save()
        return newMessage
      }
    }
    const newMessage = await MessageModel.create({
      body: messageDto.body,
      created: new Date(),
      sender: user._id,
      dialog: dialog._id,
    })
    dialog.messages = [newMessage, ...dialog.messages]
    await dialog.save()
    return newMessage
  }

  async createByDialog(user: User, messageDto: MessageDialogIdDto): Promise<Message> {
    const dialog = await DialogModel.findById(messageDto.dialogId)
      .findOne({ users: user._id })
      .exec()

    if (isNil(dialog)) {
      throw new BadRequestException()
    }
    const newMessage = await MessageModel.create({
      body: messageDto.body,
      created: new Date(),
      sender: user._id,
      dialog: dialog._id,
    })
    dialog.messages = [newMessage, ...dialog.messages]
    await dialog.save()
    return newMessage
  }
}
