import express from 'express'
import ContactsController from '../../controllers/contactController.js'
import { vld } from '../../middlewares/index.js'
import { asyncWrapper } from '../../helpers/index.js'
import {
  joiContactSchema,
  joiFavoriteContactSchema,
  joiPatchedContactSchema
} from '../../models/Contact.js'

const router = express.Router()

const addPostValidation = vld(joiContactSchema)
const patchPostValidation = vld(joiPatchedContactSchema)
const updateStatusValidation = vld(joiFavoriteContactSchema)

router.get('/', asyncWrapper(ContactsController.listContactsCtrl))

router.get('/:contactId', asyncWrapper(ContactsController.getContactByIdCtrl))

router.post('/', addPostValidation, asyncWrapper(ContactsController.addContactCtrl))

router.delete('/:contactId', asyncWrapper(ContactsController.removeContactCtrl))

router.patch(
  '/:contactId',
  patchPostValidation,
  asyncWrapper(ContactsController.updateContactCtrl)
)
router.patch(
  '/:contactId/favorite',
  updateStatusValidation,
  asyncWrapper(ContactsController.updateContactStatusCtrl)
)

export default router
