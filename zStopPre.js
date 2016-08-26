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
        state = await J.willRunFixedCommand("npm cache clean")
        state = await J.willRunFixedCommand("node d backup")
        state = await J.willRunFixedCommand("npm update -g")
    }
    return state
}

async function mainProcess() {
    let token = J.randomSeed()
    let state = await J.postData(`${J.ils}/gitHookTokenWrite`, {token})
    state = await J.willRunFixedCommand("git add . --all")
    state = await J.willRunFixedCommand(`git commit -m "${(new Date).toGMTString()}-${token}"`)
    state = await J.willRunFixedCommand("git push")
    return state
}
mainProcess().then(incoming=>{
    shadowProcess().then(console.log)
})
