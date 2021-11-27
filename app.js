import express from 'express'
import logger from 'morgan'
import cors from 'cors'

import { contactsRouter, authRouter } from './routes/api/index.js'
import { errorHandler } from './helpers/index.js'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)

app.use(errorHandler)

export default app
