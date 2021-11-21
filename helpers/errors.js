import { HttpCodes } from '../constants.js'

class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.status = HttpCodes.BAD_REQUEST
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.status = HttpCodes.BAD_REQUEST
  }
}

export { ValidationError, BadRequestError }
