const { User } = require('../../models')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { v4: uuidv4 } = require('uuid')
const sgMail = require('@sendgrid/mail')

const register = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const avatarUrl = gravatar.url(email)

  const verifyToken = uuidv4()
  const newUser = new User({
    email,
    verifyToken,
    subscription,
    avatarUrl
  })
  newUser.setPassword(password)
  await newUser.save()

  sgMail.setApiKey(process.env.SENDGRID_KEY)

  const msg = {
    to: newUser.email,
    from: 'chaban_az14@nuwm.edu.ua',
    subject: 'Подтверждение регистрации на сайте',
    html: `
        <a href='http://localhost:3000/api/auth/verify/${verifyToken}' target = '_blank'> Подтвердить почту</a>
    `
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch(error => {
      console.error(error)
    })

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      data: {
        verifyToken
      },
    },
    status: 'success',
    code: 201,
    message: 'Success register',
  })
}

module.exports = register;