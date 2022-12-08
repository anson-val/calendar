const jwt = require('jsonwebtoken')

module.exports = function generateRefreshToken (req, res, next) {
    if (!req.isLoggedIn) {
        return next()
    }

    const refreshToken = jwt.sign({userId: req.id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: '2592000s'})

    res.cookie("refresh", refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 2592000 * 1000)
    })
    next();
}