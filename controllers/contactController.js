/* eslint-disable no-useless-constructor */

import { HttpCodes } from '../constants.js'
import { ContactsService } from '../services/index.js'

class ContactsController {
  constructor() { }
  static async listContactsCtrl(req, res) {
    let { page = 1, limit = 5, favorite } = req.query
    page = parseInt(page)
    limit = parseInt(limit)
    const { _id } = req.user
    const contacts = await ContactsService.listContacts(_id, page, limit, favorite)
    return res.json(({
      success: true,
      code: HttpCodes.OK,
      data: {
        contacts
      },
      message: 'Contacts found.',
    }))
  }

  static async getContactByIdCtrl(req, res) {
    const { contactId } = req.params
    const { _id } = req.user
    const contact = await ContactsService.getContactById(contactId, _id)
    return res.send({
      success: true,
      code: HttpCodes.OK,
      data: {
        contact,
      },
      message: `Contact with id ${contactId} found.`,
    })
  }

  static async removeContactCtrl(req, res) {
    const { contactId } = req.params
    const { _id } = req.user
    const contact = await ContactsService.removeContact(contactId, _id)
    return res.send({
      success: true,
      code: HttpCodes.OK,
      data: {
        contact,
      },
      message: `Contact with id ${contactId} was removed.`,
    })
  }

  static async addContactCtrl(req, res) {
    const { name } = req.body
    const { _id } = req.user
    await ContactsService.getContactByName(name)
    const contact = await ContactsService.addContact(req.body, _id)
    return res.send({
      success: true,
      code: HttpCodes.CREATED,
      data: {
        contact,
      },
      message: 'Created!'
    })
  }

  static async updateContactCtrl(req, res) {
    const { contactId } = req.params
    const { _id } = req.user
    await ContactsService.getContactById(contactId, _id)
    const contact = await ContactsService.updateContact(contactId, req.body)

    return res.send({
      success: true,
      code: HttpCodes.OK,
      data: {
        contact,
      },
      message: `Contact with id ${contactId} was updated.`,
    })
  }

  static async updateContactStatusCtrl(req, res) {
    const { contactId } = req.params
    const { _id } = req.user
    await ContactsService.getContactById(contactId, _id)
    const contact = await ContactsService.updateContactStatus(contactId, req.body, _id)
    return res.send({
      success: true,
      code: HttpCodes.OK,
      data: {
        contact,
      },
      message: `Contact with id ${contactId} was updated.`,
    })
  }
}

export default ContactsController
