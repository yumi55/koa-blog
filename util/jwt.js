const jwt = require("jsonwebtoken")
// jwt跨域认证的解决方案，返回头部.负载.签名
const { promisify } = require("util")
const toJwt = promisify(jwt.sign)
const verify = promisify(jwt.verify)

module.exports.createToken = async userInfo => {
    return toJwt(
        { userInfo },
        'koa-blog',
        {
            expiresIn: 60 * 60 * 24 // 24h
        }
    )
}


// 验证token 
module.exports.verifyToken = function (required = true) {
    return async (ctx, next) => {
        var token = ctx.headers.authorization
        token = token ? token.split("Bearer ")[1] : null
        if (token) {
            try {
                var userInfo = await verify(token, 'koa-blog')
                ctx.user = userInfo
                await next()
            } catch (error) {
                ctx.throw(402, error)
            }
        } else if (required) {
            ctx.throw(402, '无效的token')
        } else {
            await next()
        }
    }
}