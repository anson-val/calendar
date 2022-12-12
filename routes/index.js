const express = require('express'),
    app = express(),
    router = express.Router(),
    verifyToken = require("../middleware/verifyToken"),
    decodeAccessToken = require("../middleware/decodeAccessToken"),
    validateToken = require("../middleware/tokenActions"),
    generateAccessToken = require("../middleware/generateAccessToken"),
    saveEvent = require("../middleware/saveEvent");

router.route("/").get( verifyToken, decodeAccessToken, validateToken, generateAccessToken, (req, res) => {
    if (req.validToken) {
        res.render("index", { eventDisplay: "none"})
    } else if (req.tokenNeedRefresh){
        res.redirect("/")
    } else {
        res.redirect("login")
    }
})

router.route("/new").get((req, res) => {
    res.render("index", {eventDisplay: "block"})
}).post(saveEvent, async (req,res) => {
    res.send("OK")
})

module.exports = router