"use strict"
const exec = require("child_process").exec
const env = require("dotenv-helper")
const R = require("ramda")
const J = require("./common")

let zapierHook = `https://hooks.zapier.com/hooks/catch/${env.getEnv("zapier")}?domain=`
let takeDomain = R.compose(R.last, R.split("https://"))
let willRunOnce = R.once((url)=>{
    J.willRequest(url).then(J.lg)
})
let proc = exec("lt --port 3001", {
    "cwd": __dirname
})
proc.stdout.on("data", function(chunk) {
    let domainExposed = takeDomain(chunk.toString())
    willRunOnce(`${zapierHook}${domainExposed}`)
})
proc.stdout.on("error", function(error) {
    console.error(error)
})
proc.stdout.on("end", function() {
    process.exit(0)
})
