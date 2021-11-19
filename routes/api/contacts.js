import express from 'express'
import ContactsController from '../../controllers/contactController.js'
import vld from '../../middlewares/validationMiddleware.js'

const router = express.Router()

router.get('/', ContactsController.listContacts)

router.get('/:contactId', ContactsController.getContactById)

router.post('/', vld.addPostValidation, ContactsController.addContact)

router.delete('/:contactId', ContactsController.removeContact)

router.patch(
  '/:contactId',
  vld.patchPostValidation,
  ContactsController.updateContact
)

export default router
