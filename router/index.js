const Router = require('@koa/router')
const router = new Router({ prefix: '/api/v1' })
const userController = require('../controller/userController')

router.get('/user/:id', userController.user)

module.exports = router