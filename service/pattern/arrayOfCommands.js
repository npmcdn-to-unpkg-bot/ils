"use strict"
const J = require("../../common")
let commands = ["git pull", "npm run deploy"]

async function mainAsync() {
    let awaited
    for (let singleCommand of commands) {
        awaited = await J.willRunFixedCommand(singleCommand)
    }
    return awaited
}
async function main() {
    return deployRootAsync()
}

module.exports.main = main
