import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error'
import mongoose from 'mongoose'
// import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import './controllers'
import { iocBuild } from './ioc/build'

mongoose.connect(process.env.MONGO_CONNECTION as string, {}, (error) => {
  if (error !== null) {
    console.error(error)
  } else {
    console.log('connected to mongodb database')
  }
})

const container = new Container()
iocBuild(container)
const server = new InversifyExpressServer(container)

export const app = server
  .setConfig((app) => {
    app.use(
      cors({
        origin: [process.env.ORIGIN as string],
        credentials: true,
      }),
    )
    app.use(
      express.urlencoded({
        extended: true,
      }),
    )
    app.use(express.json())
    app.use(morgan('tiny'))
    app.use(cookieParser())
    app.use('/healthcheck', (req, res) => {
      res.send('OK!')
    })

    // app.use(
    //   '/swagger',
    //   swaggerUi.serve,
    //   // eslint-disable-next-line @typescript-eslint/no-misused-promises
    //   async (_req: express.Request, res: express.Response): Promise<any> => {
    //     return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')))
    //   },
    // )
  })
  .setErrorConfig((app) => {
    app.use(errorMiddleware)
  })
  .build()
