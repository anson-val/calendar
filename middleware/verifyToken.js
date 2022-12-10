const jwt = require('jsonwebtoken')

module.exports = function verifyToken (req, res, next) {
    req.accessContent = jwt.verify(req.cookies.access, process.env.JWT_ACCESS_SECRET, function (err, decoded) {
        if (err) {
            req.accessErrorName = err.name
            return err
        } else {
            return decoded
        }
    })

    req.refreshContent = jwt.verify(req.cookies.refresh, process.env.JWT_REFRESH_SECRET, function (err, decoded) {
        if (err) {
            return err
        } else {
            return decoded
        }
    })

    next()
}