"use strict"
const J = require("./common")

let commands = ["pm2 kill", "git pull", "pm2 start admin/ils.js", "pm2 start hapi/start.js -i max", "pm2 status"]

async function mainAsync() {
    let awaited
    for (let singleCommand of commands) {
        awaited = await J.willRunFixedCommand(singleCommand)
    }
    return awaited
}
mainAsync().then(J.lg)
