const express = require('express')
const router = express.Router()

const { joiUserSchema } = require('../../models/user')
const { controllerWrapper, validation, authenticate, upload } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

router.post('/register', validation(joiUserSchema), controllerWrapper(ctrl.register))

router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify))

router.get('/verify', controllerWrapper(ctrl.resendEmail))

router.post('/login', validation(joiUserSchema), controllerWrapper(ctrl.login))

router.get('/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/current', authenticate, controllerWrapper(ctrl.current))

router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.addAvatar))

module.exports = router;