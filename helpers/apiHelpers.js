import { ValidationError, BadRequestError } from '../helpers/index.js'

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next)
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError ||
    err instanceof BadRequestError) {
    return res.status(err.status).json({ message: err.message })
  }
  res.status(404).json({ message: err.message })
}

export { asyncWrapper, errorHandler }
