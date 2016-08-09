"use strict"
const config = require("../common")
const mongooseData = require("./_inc/mongooseData.js")
mongooseData.init(J.config.mongooseConnection)
const express = require("express")
const minify = require("express-minify")
const helmet = require("helmet")
const compression = require("compression")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
let routes = require("./routes/alt.js")
let app = express()
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(helmet())
app.get("/*", (request, response, next) => {
    let headerHost = request.headers.host
    let hostname
    if(request.headers.host.match(/:/g)){
        hostname = request.headers.host.slice(0, request.headers.host.indexOf(":"))
    }else{
        hostname = request.headers.host
    }
    if (headerHost.indexOf("www") > -1) {
        response.writeHead(301, {
            "Location": "http://ilearnsmarter.com" + request.url,
            "Expires": (new Date).toGMTString()
        })
        response.end()
    } else {
        next()
    }
})
app.use(compression())
app.set("view cache", true)
app.set("views", __dirname + "/viewsPug")
app.set("view engine", "pug")
app.use(favicon(__dirname + "/public/favicon.ico"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(minify({cache:`${__dirname}/cache`}))
app.use(express.static(`${__dirname}/public`), { maxAge: 86400000 }))
app.use("/", routes)
app.use((req, res) =>{
    J.logger.error(`${res.statusCode} ${req.url}`)
    res.render("error")
})
module.exports = app
