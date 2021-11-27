const { User } = require('../../models')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')

const register = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const avatarUrl = gravatar.url(email)

  const newUser = new User({ email, subscription, avatarUrl })
  newUser.setPassword(password)
  await newUser.save()

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription
    },
    status: 'success',
    code: 201,
    message: 'Success register'
  })
}

module.exports = register;