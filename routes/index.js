const express = require('express'),
    app = express(),
    router = express.Router(),
    verifyToken = require("../middleware/verifyToken"),
    decodeAccessToken = require("../middleware/decodeAccessToken"),
    validateToken = require("../middleware/tokenActions"),
    generateAccessToken = require("../middleware/generateAccessToken");

router.route("/").get( verifyToken, decodeAccessToken, validateToken, generateAccessToken, (req, res) => {
    if (req.validToken) {
        res.render("index")
    } else if (req.tokenNeedRefresh){
        res.redirect("/")
    } else {
        res.redirect("login")
    }
})

module.exports = router