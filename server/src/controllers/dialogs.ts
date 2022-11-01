import { Router } from 'express'
import authMiddleware from '../middleware/auth'
import { RequestHandler } from 'express-serve-static-core'
import RequestWithUser from '../interfaces/request-with-user'
import { DialogModel } from '../models'
import { userFieldsName, modelFieldsName } from '../const'

const router = Router()

router.get('/', authMiddleware as RequestHandler, (req, res) => {
  const user = (req as RequestWithUser).user

  void DialogModel.find({ users: user._id })
    .select(modelFieldsName)
    .populate([
      { path: 'users', select: userFieldsName },
      { path: 'messages', select: modelFieldsName },
    ])
    .exec()
    .then((dialogs) => {
      res.send(dialogs)
    })
})
router.get('/:id', authMiddleware as RequestHandler, (req, res) => {
  const user = (req as RequestWithUser).user

  void DialogModel.findById(req.params.id)
    .findOne({ users: user._id })
    .select(modelFieldsName)
    .populate([
      { path: 'users', select: userFieldsName },
      { path: 'messages', select: modelFieldsName },
    ])
    .exec()
    .then((dialog) => {
      res.send(dialog)
    })
})

export default router
