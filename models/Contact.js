const { Schema, model, SchemaTypes } = require('mongoose')
const Joi = require('joi')

const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneRegexp = /^[0-9]{9}$/

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegexp,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: phoneRegexp,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
}, { versionKey: false, timestamps: true })

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp),
  phone: Joi.string().pattern(phoneRegexp),
  favorite: Joi.boolean(),
})

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  joiContactSchema,
  updateFavoriteJoiSchema,
  Contact
}