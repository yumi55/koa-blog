const Router = require('@koa/router')
const router = new Router({ prefix: '/api/v1' })
const userController = require('../controller/userController')
const { registerValidator } = require('../middleware/validator/userValidator')
router
    .get('/user/:id', userController.user)
    .post('/user/register', registerValidator, userController.register)

module.exports = router