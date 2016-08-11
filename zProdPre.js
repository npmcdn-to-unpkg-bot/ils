"use strict"
const J = require("./common")
let commands = ["git pull", "pm2 kill", "pm2 start hapi/ssl.js -i max", "pm2 status"]
async function main() {
    let awaited
    for (let singleCommand of commands) {
        awaited = await J.willRunFixedCommand(singleCommand)
    }
    return awaited
}
main().then(J.lg)
