#!/usr/bin/env node

var app = require("./app.js")
//var debug = require("debug")("node_second:server")
var http = require("http")

var port = 8080
app.set("port", port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
    if (error.syscall !== "listen") {
        throw error
    }

  //handle specific listen errors with friendly messages
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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
    console.log("start " + server.address().port)
}
