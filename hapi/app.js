"use strict"
const J = require("../common")
const mongooseData = require("../_inc/mongooseData.js")
mongooseData.init(J.config.mongooseConnection)
const express = require("express")
const minify = require("express-minify")
const helmet = require("helmet")
const path = require("path")
const compression = require("compression")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
const env = require("dotenv-helper")
let routes = require("./routes/index.js")
let app = express()
app.use(require("express-status-monitor")()) ///status route
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(helmet())
app.get("/*", (request, response, next) => {
    if (request.headers.host.indexOf("www") > -1) {
        response.writeHead(301, {
            "Location": "https://ilearnsmarter.com" + request.url,
            "Expires": (new Date).toGMTString()
        })
        response.end()
    } else {
        next()
    }
})
app.use(compression())
app.set("view cache", true)
app.set("views", __dirname + "/views")
app.set("view engine", "jsx")
app.engine("jsx", require("express-react-views").createEngine())
app.use(favicon(__dirname + "/public/favicon.ico"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(minify({cache:`${__dirname}/cache`}))
app.use(express.static(path.join(__dirname, "public"), { maxAge: 86400000 }))
app.use("/", routes)
app.use((req, res) =>{
    J.logger.error(`${res.statusCode} ${req.url} ${app.get("env")}`)
    res.render("error")
})
module.exports = app
