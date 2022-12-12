const jwt = require('jsonwebtoken')

module.exports = function generateAccessToken (req, res, next) {
    if (!req.isLoggedIn && !req.tokenNeedRefresh) {
        return next()
    }

    const accessToken = jwt.sign({userId: req.id},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '9000s'})

    res.cookie("access", accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 2592000 * 1000)
    })

    next();
}
