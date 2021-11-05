import { HttpCodes } from './constants.js'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'

import contactsRouter from './routes/api/contacts.js'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res, next) => {
  console.log(res)

  res.status(HttpCodes.NOT_FOUND).send({
    success: false,
    code: HttpCodes.NOT_FOUND,
    data: 'Not found',
    message: `Страница ${req.headers.host + req.originalUrl} не найдена`,
  })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

export default app
