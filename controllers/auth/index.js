const register = require('./register')
const verify = require('./verify')
const resendEmail = require('./resendEmail')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const addAvatar = require('./addAvatar')

module.exports = {
  register,
  verify,
  login,
  logout,
  current,
  addAvatar
}