const Joi = require('joi')
const { User } = require('../../model/index')

module.exports.registerValidator = async (ctx, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).validate(ctx.request.body)

    if (schema.error) {
        ctx.throw(400, schema.error)
    }
    const emailValidate = await User.findOne({ email: ctx.request.body.email })
    if (emailValidate) {
        ctx.throw(400, '邮箱已经被注册')
    }
    await next()
}

module.exports.loginValidate = async (ctx, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).validate(ctx.request.body)

    if (schema.error) {
        ctx.throw(400, schema.error)
    }
    const emailValidate = await User.findOne({ email: ctx.request.body.email })
    if (!emailValidate) {
        ctx.throw(400, '邮箱未被注册')
    }
    await next()
}