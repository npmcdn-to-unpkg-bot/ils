#!/usr/bin/env node

"use strict"
const J = require("../common")
const mongooseData = require("./_inc/mongooseData.js")
mongooseData.init(J.config.mongooseConnection)
const express = require("express")
const fs = require("fs")
const http = require("http")
const https = require("https")
const minify = require("express-minify")
const helmet = require("helmet")
const path = require("path")
const compression = require("compression")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
const env = require("dotenv-helper")
let routes = require("./routes/index.js")
let app = express()
// app.use((req, res, next) =>{
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//     next()
// })
app.get("/*", (request, response, next) => {
    let headerHost = request.headers.host
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
app.set("view cache", true)
app.set("views", __dirname + "/views")
app.set("view engine", "jsx")
app.engine("jsx", require("express-react-views").createEngine())
app.use(favicon(__dirname + "/public/favicon.ico"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(minify({cache:`${__dirname}/cache`}))
app.use(express.static(path.join(__dirname, "public"), { maxAge: 86400000 }))
app.use(helmet())
app.use(compression())
app.use("/", routes)
app.use((req, res) =>{
    J.logger.error(`${res.statusCode} ${req.url} ${app.get("env")}`)
    res.render("error")
})
let httpApp = express()
var httpsOptions = {
    key: fs.readFileSync("/etc/letsencrypt/live/ilearnsmarter.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/ilearnsmarter.com/fullchain.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/live/ilearnsmarter.com/chain.pem")
}
const port = 3002
httpApp.set("port", port)
httpApp.get("*", (req, res, next)=>{
    res.redirect("https://" + req.headers.host + "/" + req.path)
})
//app.set("port", 443)
app.enable("trust proxy")
http.createServer(httpApp).listen(httpApp.get("port"), () =>{
    console.log(`Express HTTP server listening on port ${httpApp.get("port")}`)
})
spdy.createServer(httpsOptions, app).listen(443, (error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log(`Listening on port 443`)
    }
})
