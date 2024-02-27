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
