"use strict"
const J = require("./common.js")
let subdomain =  "toteff"
let port = "3000"
J.willRunFixedCommand(`./ngrok http -subdomain=${subdomain} ${port}`).then(J.lg)
