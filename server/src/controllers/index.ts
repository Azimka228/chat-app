import { Router } from 'express'
import { UserModel } from '../models'

const router = Router()

router.get('/healthcheck', (req, res) => {
  res.send('OK')
})

/*router.get('create-user-test', async (req, res) => {
  const userModel = new UserModel({ name: 'test', email: 'test@test.com' })

  await userModel.save()
  res.send('OK')
})*/

export default router
