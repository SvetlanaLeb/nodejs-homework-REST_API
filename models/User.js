import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Joi from 'joi'
const { Schema } = mongoose

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
})
const joiUserSchema = Joi.object({
  password: Joi.string().min(5).max(20).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().optional(),
  token: Joi.string().optional(),
})

userSchema.pre('save', async function () {
  if (this.isNew || this.isModified) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

const User = mongoose.model('user', userSchema)

export { User, joiUserSchema }
