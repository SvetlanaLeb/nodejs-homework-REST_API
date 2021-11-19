/* eslint-disable no-useless-constructor */

import { HttpCodes } from '../constants.js'
import db from '../model/contacts/index.js.js.js'

class ContactsController {
  constructor() { }
  static async listContacts (req, res) {
    try {
      const contacts = await db.listContactsDB()
      res.json(({
        success: true,
        code: HttpCodes.OK,
        data: {
          contacts
        },
        message: 'Contacts found.',
      }))
    } catch (error) {
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: 'Not found',
        message: `Contacts not found. ${error.message}`,
      })
    }
  }

  static async getContactById(req, res) {
    const { contactId } = req.params
    try {
      const contact = await db.getContactByIdDB(contactId)
      if (contact) {
        return res.send({
          success: true,
          code: HttpCodes.OK,
          data: {
            contact,
          },
          message: `Contact with id ${contactId} found.`,
        })
      }
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: 'Not found',
        message: `Contact with id ${contactId} not found.`,
      })
    } catch (err) {
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: 'Not found',
        message: `Contact not found. ${err.message}`,
      })
    }
  }

  static async removeContact(req, res) {
    const { contactId } = req.params

    try {
      const contact = await db.removeContactDB(contactId)
      if (contact) {
        return res.send({
          success: true,
          code: HttpCodes.OK,
          data: {
            contact,
          },
          message: `Contact with id ${contactId} was removed.`,
        })
      }
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: 'Not found',
        message: `Contact with id ${contactId} not found.`,
      })
    } catch (err) {
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: 'Not found',
        message: 'Contact not found',
      })
    }
  }

  static async addContact(req, res) {
    const { name } = req.body
    try {
      if (!name) {
        return res.send({
          success: false,
          code: HttpCodes.BAD_REQUEST,
          data: 'Invalid request',
          message: 'Missing required name field',
        })
      }
      const contact = await db.addContactDB(req.body)
      if (contact) {
        return res.send({
          success: true,
          code: HttpCodes.CREATED,
          data: {
            contact,
          },
          message: 'Created'
        })
      }
      res.send({
        success: false,
        code: HttpCodes.BAD_REQUEST,
        data: 'Invalid request',
        message: `There is already a contact with the name ${name}`,
      })
    } catch (err) {
      res.send({
        success: false,
        code: HttpCodes.BAD_REQUEST,
        data: 'Invalid request',
        message: `${err.message}`,
      })
    }
  }

  static async updateContact(req, res) {
    const { body } = req
    const { contactId } = req.params
    try {
      const contact = await db.updateContactDB(contactId, body)
      if (!contact) {
        return res.send({
          success: false,
          code: HttpCodes.NOT_FOUND,
          data: 'Not found',
          message: `Contact with id ${contactId} not found.`,
        })
      }
      if (JSON.stringify(body) === '{}') {
        return res.send({
          success: false,
          code: HttpCodes.BAD_REQUEST,
          data: 'Invalid request',
          message: 'Missing fields.',
        })
      }
      res.send({
        success: true,
        code: HttpCodes.OK,
        data: {
          contact,
        },
        message: `Contact with id ${contactId} was updated.`,
      })
    } catch (err) {
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: 'Not found',
        message: `Contact with id ${contactId} not found.`,
      })
    }
  }
}

export default ContactsController
