const jwt = require('jsonwebtoken')

module.exports = function decodeAccessToken (req, res, next) {
    req.decodedAccessContent = jwt.decode(req.cookies.access)
    next()
}