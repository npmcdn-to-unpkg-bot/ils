#!/usr/bin/env node

"use strict"
const app = require("./app.js")
const http = require("http")

const port = 3000

app.set("port", port)
let server = http.createServer(app)

server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

function onError (error) {
    if (error.syscall !== "listen") {
        throw error
    }
    switch (error.code) {
    case "EACCES":
        console.error("Port " + port + " requires elevated privileges")
        process.exit(1)
        break
    case "EADDRINUSE":
        console.error("Port " + port + " is already in use")
        process.exit(1)
        break
    default:
        throw error
    }
}

function onListening () {
    console.log("start " + server.address().port)
}
