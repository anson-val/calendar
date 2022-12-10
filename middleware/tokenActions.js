module.exports = function validateToken (req, res, next) {

    req.validToken = false
    req.nullToken = false
    req.tokenNeedRefresh = false

    const refreshToken = req.cookies.refresh
    const accessToken = req.cookies.access

    if (!refreshToken || !accessToken) {
        req.nullToken = true
        return next()
    }

    try {
        if (req.accessContent["userId"][0]["user_id"] === req.refreshContent["userId"][0]["user_id"]) {
            req.validToken = true
        }
    } catch (err) {
        console.log(err)
    }

    console.log(req.accessErrorName)

    try {
        if (req.accessErrorName === "TokenExpiredError" && "exp" in req.refreshContent) {
            req.tokenNeedRefresh = true
            req.id = req.refreshContent["userId"][0]["user_id"]
        }
    } catch (err) {
        console.log(err)
    }

    next()
}