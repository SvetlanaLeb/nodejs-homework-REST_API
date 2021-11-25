/* eslint-disable no-useless-constructor */

import { HttpCodes } from '../constants.js'
import ContactsService from '../services/contactsService.js'
import { Contact } from '../models/index.js'

class ContactsController {
  constructor() { }
  static async listContactsCtrl (req, res) {
    const contacts = await ContactsService.listContacts()
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
    const contact = await ContactsService.getContactById(contactId)
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
    const contact = await ContactsService.removeContact(contactId)
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
    await ContactsService.getContactByName(name)
    const contact = await Contact.create(req.body)
    return res.send({
      success: true,
      code: HttpCodes.CREATED,
      data: {
        contact,
      },
      message: 'Created'
    })
  }

  static async updateContactCtrl(req, res) {
    const { contactId } = req.params
    await ContactsService.getContactById(contactId)
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
    const contact = await ContactsService.updateContactStatus(contactId, req.body)
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
