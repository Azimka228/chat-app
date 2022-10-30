import express from 'express'
import router from './controllers'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error'
import cors from 'cors'

const app = express()

app.use(
  cors({
    origin: ['http://localhost:3001'],
    credentials: true,
  }),
)

app.use(bodyParser.json())
app.use(cookieParser())

app.use(errorMiddleware)

app.use(router)

mongoose.connect('mongodb://localhost:27017/chat', {}, (error) => {
  if (error !== null) {
    console.error(error)
  } else {
    console.log('connected to mongodb database')
  }
})

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})
