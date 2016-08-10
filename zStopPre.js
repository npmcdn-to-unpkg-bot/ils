"use strict"
const J = require("./common")
const db = require("proud-db")
const env = require("dotenv-helper")
const generateSitemap = require("./_inc/generateSitemap")
let commands = ["git add . --all", `git commit -m "${(new Date).toGMTString()}"`, "git push"]
async function shadowProcess() {
    let state
    state = await db.loadParent("counter")
    let counter = state === undefined ? counter = 0 : state + 1
    state = await db.saveParent("counter", counter)
    if (counter % 5 === 0 && env.getEnv("hostTag") === "root") {
        J.box("5th time")
        state = await generateSitemap.main()
    }
    J.lg(state)
    J.lg(counter)
    return state
}

async function mainProcess() {
    let state
    for (let singleCommand of commands) {
        J.log(singleCommand)
        state = await J.willRunFixedCommand(singleCommand)
        J.log(state)
    }
    return state
}
mainProcess().then(incoming=>{
    J.log(incoming, "after main")
    shadowProcess().then(console.log)
})
