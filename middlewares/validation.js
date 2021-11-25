import { ValidationError } from '../helpers/index.js'

const vld = (schema) => {
  const validFunc = (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      next(new ValidationError(JSON.stringify(error.details)))
    }
    next()
  }
  return validFunc
}

export default vld
