const { User } = require('../model/index')
module.exports.user = async ctx => {
    const user = await User.findById(ctx.params.id)
    ctx.body = user
}
// 用户注册
module.exports.register = async ctx => {
    const userModel = new User(ctx.request.body)
    const dbBack = await userModel.save()
    ctx.body = dbBack
}