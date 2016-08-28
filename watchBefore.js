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
watcher.watchFiles(["**/*.jsx", "**/*.js", "**/*.less"], (ev, filepath) => {
    if (filterFn((negativeWord)=>{
        return filepath.includes(negativeWord)
    })) {
        return null
    } else {
        if (mainFlag === true) {
            mainFlag = false
            if (fileExists(filepath)) {
                J.box(`⚡⚡⚡  ${J.takeName(filepath)} Will Start  ⚡⚡⚡`)
                processFn(filepath).then((incoming)=>{
                    setTimeout(()=>{
                        mainFlag = true
                    }, 1000)
                    J.log(`💡💡💡  ${J.takeName(filepath)} Is Over  💡💡💡`)
                })
            } else {
                J.lg("file does not exist?!")
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
    if (filepath.includes("hot/src") &&
     filepath.includes(".js") &&
     !filepath.includes("index") &&
     !filepath.includes("components")) {
        J.log("hot src")
        J.log(commands.babelifyHapiAlt)
        iMeanNothing = await willRunFixedCommand(commands.babelifyHapiAlt)
        J.log(commands.babelifyHapiAltProd)
        return iMeanNothing
    } else if (filepath.includes("hot") && filepath.includes(".less")) {
        J.log("hot less")
        iMeanNothing = await willRunFixedCommand(commands.less)
        iMeanNothing = await willRunFixedCommand(commands.lessHapi)
        return iMeanNothing
    } else if (filepath.includes("Front.jsx")) {
        J.log("Front.jsx")
        J.log(commands.babelifyHapi)
        iMeanNothing = await willRunFixedCommand(commands.babelifyHapi)
        return iMeanNothing
    } else if (filepath.includes("Pre.jsx")) {
        J.log("Pre.jsx")
        J.lg(commands.babelify)
        iMeanNothing = await willRunFixedCommand(commands.babelify)
        iMeanNothing = await willRunFixedCommand(commands.lintReact)
        return iMeanNothing
    } else if (filepath.includes(".jsx") && (filepath.includes("services"))) {
        J.log("babelify services")
        J.log(commands.babelify)
        iMeanNothing = await willRunFixedCommand(commands.babelify)
        iMeanNothing = await willRunFixedCommand(commands.lintReact)
        return iMeanNothing
    } else if (filepath.includes(".jsx")) {
        J.log("react lint")
        iMeanNothing = await willRunFixedCommand(commands.lintReact)
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
    let output = R.replace(/(Pre\.jsx)|(Pre\.js)|(\.jsx)/g, ".js", src)
    let outputCss = R.replace(".less", ".css", src)
    let name = R.compose(R.last, R.split("/"))(output)
    let nameClean = R.replace(/\.js|\.less/, "", name)
    let srcHot = `${__dirname}/hot/front/${nameClean}.jsx`
    let outputCssHapi = `${__dirname}/hapi/public/css/${nameClean}.css`
    let hapiLocation = `${__dirname}/hapi/public/${name}`
    let hapiLocationAlt = `${__dirname}/hapi/public/${nameClean}Front.js`
    let presents = "-t [ babelify --presets [ react  es2015 stage-1 stage-3 stage-2 stage-0 ] ]"
    let presentsLite = "-t [ babelify --presets [ react  es2015 ] ]"
    let presentsProd = "-t [ babelify --presets [ react  es2015 stage-1 stage-3 stage-2 stage-0 ] ] -t [ envify --NODE_ENV production ]"
    let eslintConfigExtra = "--fix --debug --max-warnings 100 -o tmp/eslint.txt --no-ignore --cache --cache-location tmp --config"
    let eslintConfig = "--fix --max-warnings 500 --no-ignore --cache --cache-location tmp"
    willReturn.lintReact = `eslint ${src} ${eslintConfigExtra} -c .eslintrcReact.json`
    willReturn.lint = `eslint ${src} ${eslintConfig}`
    willReturn.less = `lessc ${src} ${outputCss}`
    willReturn.lessHapi = `lessc ${src} ${outputCssHapi}`
    willReturn.ts = `tsc ${src}`
    willReturn.babel = `babel ${src} --out-file ${output}`
    willReturn.babelify = `browserify ${src} -o ${output} ${presents}`
    willReturn.babelifyHapi = `browserify ${src} -o ${hapiLocation} ${presentsLite}`
    willReturn.babelifyHapiAlt = `browserify ${srcHot} -o ${hapiLocationAlt} ${presentsLite}`
    willReturn.babelifyHapiProd = `browserify ${src} -o ${hapiLocation} ${presentsProd}`
    willReturn.babelifyHapiAltProd = `browserify ${srcHot} -o ${hapiLocation} ${presentsProd}`
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
