const express = require('express'),
    app = express(),
    router = express.Router(),
    createUser = require("../middleware/createUser.js"),
    checkUser = require("../middleware/checkUser.js"),
    fetchUserid = require("../middleware/fetchUserId"),
    generateAccessToken = require("../middleware/generateAccessToken"),
    generateRefreshToken = require("../middleware/generateRefreshToken");

app.use(createUser)
app.use(checkUser)
app.use(fetchUserid)
app.use(generateAccessToken)
app.use(generateRefreshToken)

router.route("/").get((req, res) => {
    res.render("login")
}).post(createUser, checkUser, fetchUserid, generateAccessToken, generateRefreshToken, async (req, res) => {
    res.render("index")
})

module.exports = router