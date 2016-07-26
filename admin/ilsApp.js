"use strict"
const J = require("../common")
const express = require("express")
const path = require("path")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
const mainRoute = require("./routes/indexAlt.js")
let app = express()
app.use((req, res, next) =>{
    if (!J.auth(req.ip)) {
        res.send("No")
    }
    if (req.body) {
        J.logger.debug(`${req.url} ${req.body}`)
    } else {
        J.logger.debug(`${req.url}`)
    }
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.set("views", __dirname + "/views")
app.set("view engine", "jsx")
app.engine("jsx", require("express-react-views").createEngine())
app.use(favicon(__dirname + "/public/favicon.ico"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use("/", mainRoute)
app.use(function (req, res) {
    res.send({
        message: "more"
    })
})
module.exports = app
