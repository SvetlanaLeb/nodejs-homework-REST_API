import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
import { NotAuthorizedError, ConflictError } from '../helpers/index.js'

class AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor() { }
  static async registration(email, password) {
    const foundEmail = await User.findOne({ email })
    if (foundEmail) {
      throw new ConflictError(`Email '${email}' in use .`)
    }
    const user = new User({ email, password })
    await user.save()
    return user
  }

  static async login(email, password) {
    const user = await User.findOne({ email })
    if (!user) {
      throw new NotAuthorizedError(`No user with email '${email}' found.`)
    }
    if (!await bcrypt.compare(password, user.password)) {
      throw new NotAuthorizedError('Wrong password.')
    }
    const token = jwt.sign({
      _id: user._id,
      subscription: 'starter'
    }, process.env.JWT_SECRET)
    await User.findOneAndUpdate(
      { email },
      { token }
    )
    return { token, user }
  }

  static async logout(id) {
    const user = await User.findById(id)
    if (!user) {
      throw new NotAuthorizedError(`No user with id '${id}' found.`)
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { token: null },
      { new: true }
    )
    return updatedUser
  }

  static async findCurrentUser(id) {
    const user = await User.findById(id)
    if (!user) {
      throw new NotAuthorizedError(`No user with id '${id}' found.`)
    }
    return user
  }
}

export default AuthService
