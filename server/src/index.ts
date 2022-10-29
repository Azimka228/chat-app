import express from 'express'
import router from './controllers'
import mongoose from 'mongoose'

const app = express()

app.use(router)

mongoose.connect('mongodb://localhost:27017/chat', {}, async (error) => {
  if (error) {
    console.error(error)
  } else {
    console.log('connected to mongodb database')
  }
})

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})
