import { Contact } from '../models/index.js'
import { BadRequestError } from '../helpers/index.js'

class ContactsService {
  // eslint-disable-next-line no-useless-constructor
  constructor() { }
  static async listContacts(owner, page, limit, favorite) {
    const options = {
      page,
      limit
    }
    const contacts = await Contact.paginate({ owner }, options, function (err, result) {
      if (err) { throw new BadRequestError(err.message) }
      return result
    })
    if (favorite) {
      const contacts = await Contact.aggregate([{
        $match: {
          favorite: true
        }
      }])
      return contacts
    }
    return contacts
  }

  static async getContactById(_id, owner) {
    const contact = await Contact.findOne({ _id, owner })
    if (!contact) {
      throw new BadRequestError(`Contact with id ${_id} not found.`)
    }
    return contact
  }

  static async getContactByName(name) {
    const contact = await Contact.findOne({ name: name })
    if (contact) {
      throw new BadRequestError(`There is already a contact with the name ${name}`)
    }
  }

  static async removeContact(_id, owner) {
    const contact = await Contact.findOneAndDelete({ _id, owner })
    if (!contact) {
      throw new BadRequestError(`Contact with id ${_id} not found.`)
    }
    return contact
  }

  static async addContact(body, owner) {
    const contact = await Contact.create({ ...body, owner })
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

  static async updateContactStatus(_id, body, owner) {
    if (JSON.stringify(body) === '{}') {
      throw new BadRequestError('Missing fields favorite.')
    }
    const { favorite } = body
    const contact = await Contact.findOneAndUpdate(
      {
        _id,
        owner
      },
      { favorite },
      { new: true })
    return contact
  }
}

export default ContactsService
