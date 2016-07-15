#!/usr/bin/env
"use strict"
const watcher = require("ape-watching")
const J = require("./common.js")
const R = require("ramda")
const fileExists = require("file-exists")
const exec = require("child_process").exec
let mainFlag = true
let negativeWordArr = [
    "node_modules",
    "eslint",
    ".log",
    "git",
    ".json",
    "App.js",
    "cache"
]
let filterFn = J.anyFn(negativeWordArr)
watcher.watchFiles(["**/*.jsx", "**/*.js", "*.less"], (ev, filepath) => {
    if (filterFn((negativeWord)=>{
        return filepath.includes(negativeWord)
    })) {
        return null
    } else {
        if (mainFlag === true) {
            mainFlag = false
            if(fileExists(filepath)){
                J.box(`⚡⚡⚡  ${J.takeName(filepath)} Will Start  ⚡⚡⚡`)
                processFn(filepath).then((incoming)=>{
                    setTimeout(()=>{
                        mainFlag = true
                    }, 1000)
                    J.log(`💡💡💡  ${J.takeName(filepath)} Is Over  💡💡💡`)
                })
            }else{
                setTimeout(()=>{
                    mainFlag = true
                }, 1000)
            }
        }
    }
})

async function processFn(filepath) {

    let iMeanNothing
    let commands = factoryCommands(filepath)
    if (filepath.includes("Front.jsx") && filepath.includes("admin")) {
        J.log("babelify admin")
        J.log(commands.babelifyHapi)
        iMeanNothing = await willRunFixedCommand(commands.babelifyAdmin)
        return iMeanNothing

    } else if (filepath.includes("Front.jsx")) {
        J.log("babelify hapi")
        J.log(commands.babelifyHapi)
        iMeanNothing = await willRunFixedCommand(commands.babelifyHapi)
        return iMeanNothing

    } else if (filepath.includes("Mob.jsx")) {
        J.log("babel babelify remove")
        J.log(commands.babel)
        iMeanNothing = await willRunFixedCommand(commands.babel)
        J.log(commands.babelifyHapiMob)
        iMeanNothing = await willRunFixedCommand(commands.babelifyHapiMob)
        iMeanNothing = await willRunFixedCommand(commands.removeMob)
        return iMeanNothing

    } else if (filepath.includes(".jsx") && (filepath.includes("services") || filepath.includes("hot"))) {
        J.log("babelify")
        J.log(commands.babelify)
        iMeanNothing = await willRunFixedCommand(commands.babelify)
        return iMeanNothing

    } else if (filepath.includes(".jsx") && filepath.includes("fth")) {
        J.log("babelify")
        iMeanNothing = await willRunFixedCommand(commands.babelify)
        return iMeanNothing

    } else if (filepath.includes(".jsx")) {
        J.log("lint react")
        iMeanNothing = await willRunFixedCommand(commands.lint)
        return iMeanNothing

    } else if (filepath.includes("Pre.js")) {
        J.log("babel lint")
        iMeanNothing = await willRunFixedCommand(commands.babel)
        iMeanNothing = await willRunFixedCommand(commands.lint)
        return iMeanNothing

    } else if (filepath.includes(".less")) {
        J.log("less")
        iMeanNothing = await willRunFixedCommand(commands.less)
        return iMeanNothing

    } else if (filepath.includes(".js") && !filepath.includes("Front")) {
        J.log("lint")
        iMeanNothing = await willRunFixedCommand(commands.lint)
        return iMeanNothing
    } else {
        return false
    }
}

function factoryCommands(src) {
    let willReturn = {}
    let srcMob = R.replace(".jsx", ".js", src)
    let output = R.replace(/(Pre\.js)|(\.jsx)/g, ".js", src)
    let outputCss = R.replace(".less", ".css", src)
    let local = output.split("/")
    let name = local[ local.length - 1 ]
    let nameMob = R.replace("Mob.js", "Front.js", local[ local.length - 1 ])
    let hapiLocation = `${__dirname}/hapi/public/${name}`
    let adminLocation = `${__dirname}/admin/public/${name}`
    let hapiMobLocation = `${__dirname}/hapi/public/${nameMob}`
    let presents = "-t [ babelify --presets [ react  es2015 stage-1 stage-3 stage-2 stage-0 ] ]"
    let eslintConfigOverkill = "--fix --debug --max-warnings 100 -o tmp/eslint.txt --no-ignore --cache --cache-location tmp --config"
    let eslintConfig = "--fix --max-warnings 500 --no-ignore --cache --cache-location tmp"
    willReturn.lintReact = `eslint ${src} ${eslintConfig} .eslintrcReact.json`
    willReturn.lint = `eslint ${src} ${eslintConfig}`
    willReturn.less = `lessc ${src} ${outputCss}`
    willReturn.ts = `tsc ${src}`
    willReturn.removeMob = `rm ${output}`
    willReturn.babel = `babel ${src} --out-file ${output}`
    willReturn.babelify = `browserify ${src} -o ${output} ${presents}`
    willReturn.babelifyHapi = `browserify ${src} -o ${hapiLocation} ${presents}`
    willReturn.babelifyAdmin = `browserify ${src} -o ${adminLocation} ${presents}`
    willReturn.babelifyHapiMob = `browserify ${srcMob} -o ${hapiMobLocation} ${presents}`
    willReturn.babelifyAdmin = `browserify ${src} -o ${adminLocation} ${presents}`
    return willReturn
}

function willRunFixedCommand(commandIs) {
    return new Promise((resolve)=>{
        let proc = exec(commandIs)
        proc.stdout.on("data", function(chunk) {
            console.log(chunk.toString())
        })
        proc.stdout.on("error", function(error) {
            console.error(error)
        })
        proc.stdout.on("end", function() {
            resolve(true)
        })
        proc.stdout.on("error", function(error) {
            console.error(error)
            resolve(error)
        })
    })
}
