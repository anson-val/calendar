const express = require('express')
const app = express()
const port = 3000

app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded())

const loginRouter = require("./routes/login.js")
app.use("/login", loginRouter)

app.get("/", (req, res) => {
    res.redirect("login");
})

app.listen(port);