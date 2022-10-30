import { Router } from 'express'
import authRout from './auth'
import authMiddleware from '../middleware/auth'
import { RequestHandler } from 'express-serve-static-core'
import RequestWithUser from '../interfaces/request-with-user'
import { getUserReturn } from '../help/user'

const router = Router()

router.use('/auth', authRout)

router.get('/healthcheck', (req, res) => {
  res.send('OK')
})

router.get('/my', authMiddleware as RequestHandler, (req, res) => {
  res.send(getUserReturn((req as RequestWithUser).user))
})

export default router
