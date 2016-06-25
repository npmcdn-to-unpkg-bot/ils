"use strict"
const J = require("./common")
J.willRunFixedCommand("pm2 kill")
setTimeout(()=>{
    J.willRunFixedCommand("pm2 start zStart.js")
},7000)
