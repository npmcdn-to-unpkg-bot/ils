"use strict"
const J = require("./common.js")

J.willRunFixedCommand("pm2 kill all").then(console.log)
setTimeout(()=>{
    J.willRunFixedCommand("pm2 start qNgrokStartHot").then(console.log)
},15000)
