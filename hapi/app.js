"use strict"
const express = require("express")
const minify = require("express-minify")
const helmet = require("helmet")
const path = require("path")
const compression = require("compression")
const favicon = require("serve-favicon")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const session = require("express-session")
const winston = require('winston')
const expressWinston = require('express-winston')
let routes = require("./routes/index.js")
let app = express()
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
app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ],
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
      colorStatus: true // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
}))
app.use("/", routes)
//console.log(app.get("env"))
app.use((req, res) =>{
    res.render("index")
})
module.exports = app
