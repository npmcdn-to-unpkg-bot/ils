"use strict"
const express = require("express")
const path = require("path")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
const mainRoute = require("./routes/index.js")

let app = express()

app.set("views", __dirname + "/views")
app.set("view engine", "jsx")
app.engine("jsx", require("express-react-views").createEngine())
app.use(favicon(__dirname + "/public/favicon.ico"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use("/", mainRoute)

app.use(function (err, req, res) {
    res.status(err.status || 500)
    res.send({
        message: err.message
    })
})
module.exports = app
