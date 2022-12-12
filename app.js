const express = require('express'),
    dotenv = require('dotenv'),
    cookies = require('cookie-parser'),
    app = express(),
    port = 3000;

dotenv.config({path: __dirname + '/.env' });

app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded())
app.use(cookies())

const loginRouter = require("./routes/login.js"),
    indexRouter = require("./routes/index")

app.use("/", indexRouter)
app.use("/login", loginRouter)

app.listen(port);