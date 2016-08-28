"use strict"
const J = require("./common")
let commands = ["git pull", "pm2 reload spdy"]
async function main() {
    let awaited
    for (let singleCommand of commands) {
        awaited = await J.willRunFixedCommand(singleCommand)
    }
    return awaited
}
main().then(J.lg)
