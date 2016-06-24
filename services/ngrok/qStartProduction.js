"use strict"
const J = require("./common.js")
let subdomain =  "toteff"
let mainCommand = "pm2 start hapi/start.js"
//let adminCommand = "pm2 start admin/start.js"

J.willRunFixedCommand("pm2 kill all").then(console.log)
setTimeout(()=>{
    J.willRunFixedCommand(mainCommand).then(console.log)
},3000)
// setTimeout(()=>{
//     J.willRunFixedCommand(adminCommand).then(console.log)
// },4000)
