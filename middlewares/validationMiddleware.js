import Joi from 'joi'

const validation = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().optional(),
      phone: Joi.string().min(5).max(15).pattern(/^[ 0-9()-]+$/, { name: 'numbers (___) ___-___' }).optional(),
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }
    next()
  },
  patchPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string().min(5).max(15).pattern(/^[ 0-9()-]+$/, { name: 'numbers (___) ___-___' }).optional(),
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }
    next()
  },
}
export default validation
