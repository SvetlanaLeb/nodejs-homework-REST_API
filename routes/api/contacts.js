import express from 'express'
import ctrl from '../../controllers/contactController.js'
import vld from '../../middlewares/validationMiddleware.js'

const router = express.Router()

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', vld.addPostValidation, ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.patch('/:contactId', vld.patchPostValidation, ctrl.updateContact)

export default router
