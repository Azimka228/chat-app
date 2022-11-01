import { Router } from 'express'
import authMiddleware from '../middleware/auth'
import { RequestHandler } from 'express-serve-static-core'
import { MessageModel, UserModel, DialogModel } from '../models'
import validationMiddleware from '../middleware/validation'
import { MessageDialogIdDto, MessageUserIdDto } from '../dto'
import BadRequestException from '../exceptions/bad-request'
import RequestWithUser from '../interfaces/request-with-user'
import { isNil } from 'ramda'
import NotFound from '../exceptions/not-found'

const router = Router()

router.post(
  '/user',
  authMiddleware as RequestHandler,
  validationMiddleware(MessageUserIdDto),
  (req, res, next) => {
    const dataReq = req.body as MessageUserIdDto
    const user = (req as RequestWithUser).user

    DialogModel.findOne({ users: [user._id, dataReq.toId] })
      .exec()
      .then(async (dialog) => {
        if (isNil(dialog)) {
          const recipient = await UserModel.findById(dataReq.toId).exec()
          if (isNil(recipient)) {
            next(new NotFound())
          } else {
            const newDialog = await DialogModel.create({
              users: [user._id, dataReq.toId],
              messages: [],
            })
            const newMessage = await MessageModel.create({
              body: dataReq.body,
              created: new Date(),
              sender: user._id,
              dialog: newDialog._id,
            })
            newDialog.messages = [newMessage._id]
            await newDialog.save()
            res.status(200).send(newMessage)
          }
        } else {
          const newMessage = await MessageModel.create({
            body: dataReq.body,
            created: new Date(),
            sender: user._id,
            dialog: dialog._id,
          })
          dialog.messages = [newMessage, ...dialog.messages]
          await dialog.save()
          res.status(200).send(newMessage)
        }
      })
      .catch((e) => {
        console.error(e)
        next(new BadRequestException())
      })
  },
)

router.post(
  '/dialog',
  authMiddleware as RequestHandler,
  validationMiddleware(MessageDialogIdDto),
  (req, res, next) => {
    const dataReq = req.body as MessageDialogIdDto
    const user = (req as RequestWithUser).user

    DialogModel.findById(dataReq.dialogId)
      .findOne({ users: user._id })
      .exec()
      .then(async (dialog) => {
        if (isNil(dialog)) {
          next(new BadRequestException())
        } else {
          const newMessage = await MessageModel.create({
            body: dataReq.body,
            created: new Date(),
            sender: user._id,
            dialog: dialog._id,
          })
          res.status(200).send(newMessage)
        }
      })
      .catch((e) => {
        console.error(e)
        next(new BadRequestException())
      })
  },
)

export default router
