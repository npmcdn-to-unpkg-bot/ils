#!/usr/bin/env node

"use strict"
const J = require("../common")
const mongooseData = require("../_inc/mongooseData.js")
mongooseData.init(J.config.mongooseConnection)
const express = require("express")
const fs = require("fs")
const http = require("http")
const spdy = require("spdy")
const minify = require("express-minify")
const helmet = require("helmet")
const path = require("path")
const compression = require("compression")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
const env = require("dotenv-helper")
let routes = require("./routes/index.js")
let app = express()
app.use(helmet.contentSecurityPolicy({browserSniff: true}))
app.use(helmet.xssFilter())
app.use(helmet.frameguard({ action: "deny" }))
app.use(helmet.hsts({ maxAge: 7776000000 }))
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.disable("x-powered-by")
app.use(compression())
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
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
app.set("view cache", true)
app.set("views", __dirname + "/views")
app.set("view engine", "jsx")
app.engine("jsx", require("express-react-views").createEngine())
app.use(favicon(__dirname + "/public/favicon.ico"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(minify({cache:`${__dirname}/cache`}))
app.use(express.static(path.join(__dirname, "public"), { maxAge: 2592000 }))
app.use("/", routes)
app.use((req, res) =>{
    J.logger.error(`${res.statusCode} ${req.url} ${app.get("env")}`)
    res.render("error")
})
app.enable("trust proxy")
let httpsOptions = {
    key: fs.readFileSync("/etc/letsencrypt/live/ilearnsmarter.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/ilearnsmarter.com/fullchain.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/live/ilearnsmarter.com/chain.pem")
}
spdy.createServer(httpsOptions, app).listen(443, (error) => {
    if (error) {
        console.error(error)
        return process.exit(1)
    } else {
        console.log("Listening on port 443")
    }
})
//let httpApp = express()
//const port = 3002
//httpApp.set("port", port)
//httpApp.get("*", (req, res, next)=>{
////set log
//res.redirect("https://" + req.headers.host + "/" + req.path)
//})
//
//http.createServer(httpApp).listen(httpApp.get("port"), () =>{
//console.log(`Express HTTP server listening on port ${httpApp.get("port")}`)
//})
