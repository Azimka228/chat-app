import { hash, compare } from 'bcrypt'
import { Router } from 'express'
import { UserModel } from '../models'
import BadRequestException from '../exceptions/bad-request'
import validationMiddleware from '../middleware/validation'
import { SignInDto, SignUpDto } from '../dto'
import { createCookie, createToken } from '../help/user'

const router = Router()

router.post('/sign-in', validationMiddleware(SignInDto), (req, res, next) => {
  const dataReq = req.body as SignInDto

  void UserModel.findOne({ nickName: dataReq.nickName })
    .exec()
    .then(async (user) => {
      if (user === null) {
        next(new BadRequestException())
      } else {
        const isPasswordMatching = await compare(dataReq.password, user.password)
        if (isPasswordMatching) {
          const tokenData = createToken(user)
          res.setHeader('Set-Cookie', [createCookie(tokenData)])
          res.status(204).send()
        } else {
          next(new BadRequestException())
        }
      }
    })
})

router.post('/sign-up', validationMiddleware(SignUpDto), (req, res, next) => {
  const dataReq = req.body as SignUpDto

  void UserModel.findOne({ $or: [{ nickName: dataReq.nickName }, { email: dataReq.email }] })
    .exec()
    .then(async (user) => {
      if (user !== null) {
        next(new BadRequestException())
      } else {
        const hashedPassword = await hash(dataReq.password, 10)
        const user = await UserModel.create({
          ...dataReq,
          password: hashedPassword,
        })
        const tokenData = createToken(user)
        res.setHeader('Set-Cookie', [createCookie(tokenData)])
        res.status(204).send()
      }
    })
})

router.post('/sign-out', (req, res) => {
  res.setHeader('Set-Cookie', ['Authorization=;Max-age=0'])
  res.status(204).send()
})

export default router
