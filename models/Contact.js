import mongoose from 'mongoose'
import Joi from 'joi'
const { Schema } = mongoose

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {
    versionKey: false,
    timestamps: true
  }
)
const joiContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(5).max(15).pattern(/^[ 0-9()-]+$/, { name: 'numbers (___) ___-___' }).optional(),
  favorite: Joi.boolean().optional()
})
const joiPatchedContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(5).max(15).pattern(/^[ 0-9()-]+$/, { name: 'numbers (___) ___-___' }).optional()
})
const joiFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required()
})

const Contact = mongoose.model('contact', contactSchema)

export { Contact, joiContactSchema, joiFavoriteContactSchema, joiPatchedContactSchema }
