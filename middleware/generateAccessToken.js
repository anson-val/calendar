const jwt = require('jsonwebtoken')

module.exports = function generateAccessToken (req, res, next) {
    if (!req.isLoggedIn) {
        return next()
    }

    const accessToken = jwt.sign({userId: req.id},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '900s'})

    res.cookie("access", accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 900 * 1000)
    })

    next();
}
