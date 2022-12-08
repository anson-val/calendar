const express = require('express'),
    app = express(),
    router = express.Router(),
    createUser = require("../middleware/createUser.js"),
    checkUser = require("../middleware/checkUser.js"),
    fetchUserid = require("../middleware/fetchUserId");

app.use(checkUser);
app.use(fetchUserid);

router.route("/").get((req, res) => {
    res.render("login")
}).post(createUser, checkUser, async (req, res) => {

})

module.exports = router