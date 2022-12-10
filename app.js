const express = require('express'),
    dotenv = require('dotenv'),
    cookies = require('cookie-parser'),
    verifyToken = require("./middleware/verifyToken"),
    validateToken = require("./middleware/tokenActions"),
    decodeAccessToken = require("./middleware/decodeAccessToken"),
    generateAccessToken = require("./middleware/generateAccessToken"),
    app = express(),
    port = 3000;

dotenv.config({path: __dirname + '/.env' });

app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded())
app.use(cookies())


const loginRouter = require("./routes/login.js")
app.use("/login", loginRouter)

app.get("/", verifyToken, decodeAccessToken, validateToken, generateAccessToken, (req, res) => {
    if (req.validToken) {
        res.render("index")
    } else if (req.tokenNeedRefresh){
        res.redirect("/")
    } else {
        res.redirect("login")
    }
})

app.listen(port);