import 'dotenv/config'
import { app } from './app'

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT ?? 3000}`)
})
