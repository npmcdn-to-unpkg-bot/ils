"use strict"
const J = require("./common")
let commands = ["pm2 kill", "cd hot&&pm2 start server.js", "node zStartLocalTunnel", "pm2 status"]
async function mainAsync() {
    let awaited
    for (let singleCommand of commands) {
        awaited = await J.willRunFixedCommand(singleCommand)
    }
    return awaited
}
mainAsync().then(()=>{
    process.exit(0)
})
