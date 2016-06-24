"use strict"
const exec = require("child_process").exec
const J = require("./common")
let phonegapDir = process.env.phonegapDir || "phonegap"
let port = process.env.ngrokPort || "8080"
let command = `cd ${phonegapDir}&&phonegap serve -p ${port} --no-browser`

J.willRunFixedCommand(command).then(console.log)

setTimeout(()=>{
J.willRunFixedCommand("pm2 start ngrokStart.js").then(console.log)
},5000)
