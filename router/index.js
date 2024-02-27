const Router = require('@koa/router')
const router = new Router({ prefix: '/api/v1' })
const userController = require('../controller/userController')
const { registerValidator, loginValidate } = require('../middleware/validator/userValidator')
router
    .post('/user/register', registerValidator, userController.register)
    .post('/user/login', loginValidate, userController.login)
    .get('/user/:id', userController.user)
module.exports = router