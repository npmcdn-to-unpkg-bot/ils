#!/usr/bin/env node

"use strict"
const app = require("./app.js")
const fs = require("fs")
const spdy = require("spdy")
const express = require("express")
const port = 3001
let httpsOptions = {
    key: fs.readFileSync("/etc/letsencrypt/live/ilearnsmarter.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/ilearnsmarter.com/fullchain.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/live/ilearnsmarter.com/chain.pem")
}
spdy.createServer(httpsOptions, app).listen(port, (error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log(`Listening on port ${port}`)
    }
})
