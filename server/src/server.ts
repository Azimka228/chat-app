import express from 'express'
import router from './controllers'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error'
import cors from 'cors'
import 'dotenv/config'

const app = express()

app.use(
  cors({
    origin: [process.env.ORIGIN as string],
    credentials: true,
  }),
)

app.use(bodyParser.json())
app.use(cookieParser())

app.use(router)

app.use(errorMiddleware)

mongoose.connect(process.env.MONGO_CONNECTION as string, {}, (error) => {
  if (error !== null) {
    console.error(error)
  } else {
    console.log('connected to mongodb database')
  }
})

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT ?? 3000}`)
})
