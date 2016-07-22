"use strict"
const express = require("express")
const client = require("redis").createClient()
const minify = require("express-minify")
const helmet = require("helmet")
const path = require("path")
const compression = require("compression")
const favicon = require("serve-favicon")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const J = require("../common")
let routes = require("./routes/index.js")
let app = express()
//const limiter = require("express-limiter")(app, client)
//limiter({
//path: "*",
//method: "all",
//lookup: "connection.remoteAddress",
//total: 100,
//expire: 1000 * 60
//})
app.use(helmet())
app.get("/*", (request, response, next) => {
    let headerHost = request.headers.host
    let hostname = (request.headers.host.match(/:/g)) ? request.headers.host.slice(0, request.headers.host.indexOf(":")) : request.headers.host
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
app.set("views", __dirname + "/views")
app.set("view engine", "jsx")
app.engine("jsx", require("express-react-views").createEngine())
app.use(favicon(__dirname + "/public/favicon.ico"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(cookieParser())
app.use(minify({cache:`${__dirname}/cache`}))
app.use(express.static(path.join(__dirname, "public")))
app.use((req, res, next) =>{
    J.logger.info(`${res.statusCode} ${req.url}`)
    next()
})
app.use("/", routes)
//console.log(app.get("env"))
app.use((req, res) =>{
    J.logger.error(`${res.statusCode} ${req.url} ${app.get("env")}`)
    res.render("index")
})
module.exports = app
