const { User } = require('../../models')
const { BadRequest, NotFound } = require('http-errors')
const sgMail = require('@sendgrid/mail')

const resendEmail = async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      throw new BadRequest('Email not found')
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw new NotFound('User not found')
    }
    if (user.verify) {
      throw new BadRequest('Verification has already been passed')
    }

    sgMail.setApiKey(process.env.SENDGRID_KEY)

    const msg = {
      to: user.email,
      from: 'chaban_az14@nuwm.edu.ua',
      subject: 'Подтверждение регистрации на сайте',
      html: `
        <a href='http://localhost:3000/api/auth/verify/${user.verifyToken}' target = '_blank'> Подтвердить почту</a>
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

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Verification email sent',
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = resendEmail;