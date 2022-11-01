import { Router } from 'express'
import authMiddleware from '../middleware/auth'
import { RequestHandler } from 'express-serve-static-core'
import RequestWithUser from '../interfaces/request-with-user'
import { UserModel } from '../models'
import { userFieldsName } from '../const'

const router = Router()

router.get('/my', authMiddleware as RequestHandler, (req, res) => {
  res.send((req as RequestWithUser).user)
})

router.get('/', authMiddleware as RequestHandler, (req, res) => {
  void UserModel.find()
    .select(userFieldsName)
    .exec()
    .then((users) => {
      res.send(users)
    })
})

router.get('/:id', authMiddleware as RequestHandler, (req, res) => {
  void UserModel.findById(req.params.id)
    .select(userFieldsName)
    .exec()
    .then((user) => {
      res.send(user)
    })
})

export default router
