/* eslint-disable no-useless-constructor */

import { HttpCodes } from '../constants.js'
import { AuthService } from '../services/index.js'

class AuthController {
  constructor() { }

  static async registrationCtrl(req, res) {
    const { email, password } = req.body
    const user = await AuthService.registration(email, password)
    res.json({
      success: true,
      code: HttpCodes.OK,
      user: {
        email: user.email,
        subscription: user.subscription
      },
      message: `User '${email}' registered.`
    })
  }

  static async loginCtrl(req, res) {
    const { email, password } = req.body
    const { token, user } = await AuthService.login(email, password)
    res.json({
      success: true,
      code: HttpCodes.OK,
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription
      },
      message: `User '${email}' is logged in successfully.`
    })
  }

  static async logoutCtrl(req, res) {
    const { userId } = req.params
    const user = await AuthService.logout(userId)
    res.json({
      success: true,
      code: HttpCodes.NO_CONTENT,
      user: {
        email: user.email,
        subscription: user.subscription
      },
      message: `User '${userId}' was logged out successfully.`
    })
  }

  static async findCurrentUserCtrl(req, res) {
    const { _id } = req.user
    const user = await AuthService.findCurrentUser(_id)
    res.json({
      success: true,
      code: HttpCodes.OK,
      user: {
        email: user.email,
        subscription: user.subscription
      },
      message: `Current user '${user.email}'.`
    })
  }
}

export default AuthController
