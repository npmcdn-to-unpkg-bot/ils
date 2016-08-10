"use strict"
const J = require("./common")
const db = require("proud-db")
const env = require("dotenv-helper")
const generateSitemap = require("./_inc/generateSitemap")

//let commands = ["pm2 kill", "git pull", "pm2 start admin/start.js", "pm2 start hapi/start.js -i max", "pm2 status"]
let commands = ["pm2 kill", "git pull", "pm2 start hapi/start.js -i max", "pm2 status"]
async function dbFn() {
    let iMeanNothing
    let counter
    iMeanNothing = await db.loadParent("counter")
    if (iMeanNothing === undefined) {
        counter = 0
    } else {
        counter = iMeanNothing + 1
    }
    iMeanNothing = await db.saveParent("counter", counter)
    if (counter % 5 === 0 && env.getEnv("hostTag") === "root") {
        J.box("5th time")
        iMeanNothing = await generateSitemap.main()
    }
    J.lg(iMeanNothing)
    J.lg(counter)
    return iMeanNothing
}

async function main() {
    let awaited
    for (let singleCommand of commands) {
        awaited = await J.willRunFixedCommand(singleCommand)
    }
    return awaited
}
main().then(incoming=>{
    J.log(incoming, "after main")
    dbFn().then(console.log)
})
