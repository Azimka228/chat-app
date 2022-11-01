import { Router } from 'express'
import authRout from './auth'
import usersRout from './users'
import messagesRout from './message'
import dialogsRout from './dialogs'

const router = Router()

router.use('/auth', authRout)
router.use('/users', usersRout)
router.use('/messages', messagesRout)
router.use('/dialogs', dialogsRout)

router.get('/healthcheck', (req, res) => {
  res.send('OK')
})

export default router
