const express = require('express'),
    router = express.Router(),
    createUser = require("../modules/createUser.js"),
    checkUser = require("../modules/checkUser.js");

router.route("/").get((req, res) => {
    res.render("login")
}).post(async (req, res) => {
    if (req.body.signInMode === "on") {
        switch (await createUser(req.body.email, req.body.password)) {
            case 0:
                res.send("OK");
                break;
            case 1:
                res.send("Please make sure both your email and password meet our requirement")
        }
    } else {
        switch (await checkUser(req.body.email, req.body.password)) {
            case 0:
                res.send("OK");
                break;
            case 1:
                res.send("Incorrect Password");
                break;
            case 2:
                res.send("Incorrect Email or Password");
                break;

        }
    }
})

module.exports = router