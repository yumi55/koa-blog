const { User } = require('../model/index')
module.exports.user = async ctx => {
    const user = await User.findById(ctx.params.id)
    ctx.body = user
}