const { User } = require('../model/index')
const { createToken } = require('../util/jwt')
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
// 用户登录
module.exports.login = async ctx => {
    let userinfo = await User.findOne(ctx.request.body)
    if (!userinfo) {
        return ctx.throw(402, "邮箱或者密码不正确")
    }
    userinfo = userinfo.toJSON()
    userinfo.token = await createToken(userinfo)
    ctx.body = userinfo
}
// 获取用户信息
module.exports.getUser = async ctx => {
    const userid = ctx.request.params.userid
    console.log(userid)
    const result = await User.findById(userid, [
        "name"
    ])
    ctx.body = result
}
