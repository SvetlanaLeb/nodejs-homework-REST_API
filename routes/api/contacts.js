const express = require('express')
const router = express.Router()

const { joiContactSchema, updateFavoriteJoiSchema } = require('../../models/contact')
const { controllerWrapper, validation} = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.getList))

router.get('/:id', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiContactSchema), controllerWrapper(ctrl.addContact))

router.put('/:id', validation(joiContactSchema), controllerWrapper(ctrl.updateContact))

router.patch('/:id/favorite', validation(updateFavoriteJoiSchema), controllerWrapper(ctrl.updateStatusContact))

router.delete('/:id', controllerWrapper(ctrl.removeContact))

module.exports = router;