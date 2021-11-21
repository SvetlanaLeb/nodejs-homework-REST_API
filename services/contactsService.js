import { Contact } from '../models/index.js'
import { BadRequestError } from '../helpers/index.js'

class ContactsService {
  // eslint-disable-next-line no-useless-constructor
  constructor() { }
  static async listContacts () {
    const contacts = await Contact.find({})
    return contacts
  }

  static async getContactById(id) {
    const contact = await Contact.findById(id)
    if (!contact) {
      throw new BadRequestError(`Contact with id ${id} not found.`)
    }
    return contact
  }

  static async getContactByName(name) {
    const contact = await Contact.findOne({ name: name })
    if (contact) {
      throw new BadRequestError(`There is already a contact with the name ${name}`)
    }
  }

  static async removeContact(id) {
    const contact = await Contact.findByIdAndDelete(id)
    if (!contact) {
      throw new BadRequestError(`Contact with id ${id} not found.`)
    }
    return contact
  }

  static async addContact(body) {
    const contact = await Contact.create(body)
    return contact
  }

  static async updateContact(id, body) {
    if (JSON.stringify(body) === '{}') {
      throw new BadRequestError('Missing fields.')
    }
    const foundContact = await Contact.findById(id)
    if (!foundContact) {
      throw new BadRequestError(`Contact with id ${id} not found.`)
    }
    const contact = await Contact.findByIdAndUpdate(
      id,
      body,
      { new: true }
    )

    return contact
  }

  static async updateContactStatus(id, body) {
    if (JSON.stringify(body) === '{}') {
      throw new BadRequestError('Missing fields favorite.')
    }
    const { favorite } = body
    const contact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true })
    return contact
  }
}

export default ContactsService
