"use strict"
const J = require("./common.js")
const sane = require("sane")
const R = require("ramda")
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

let watcher = sane(__dirname, {
    glob: ["**/*.jsx", "**/*.js", "*.less", "!node_modules/**/*", "!tmp/**/*"],
    poll: true,
    watchman: false,
    dot: false
})

watcher.on("ready", function () {
    J.log("ready to watch")
})

watcher.on("change", function (filepath, root, stat) {

    let canProceedFlag = filterFn((negativeWord)=>{
        return filepath.includes(negativeWord)
    })
    if (canProceedFlag) {
        return null
    } else {
        if (mainFlag === true) {
            mainFlag = false
            J.box(`⚡⚡⚡  ${J.takeName(filepath)} Will Start  ⚡⚡⚡`)
            processFn(filepath).then((incoming)=>{
                setTimeout(()=>{
                    mainFlag = true
                }, 500)
                J.log(`💡💡💡  ${J.takeName(filepath)} Is Over  💡💡💡`)
            })
        }
    }
})

watcher.on("add", function (filepath, root, stat) {

    let canProceedFlag = filterFn((negativeWord)=>{
        return filepath.includes(negativeWord)
    })
    if (canProceedFlag) {
        return null
    } else {
        if (mainFlag === true) {
            mainFlag = false
            J.box(`⚡⚡⚡  ${J.takeName(filepath)} Will Start  ⚡⚡⚡`)
            processFn(filepath).then((incoming)=>{
                setTimeout(()=>{
                    mainFlag = true
                }, 500)
                J.log(`💡💡💡  ${J.takeName(filepath)} Is Over  💡💡💡`)
            })
        }
    }
})

async function processFn(filepath) {

    let iMeanNothing
    let commands = factoryCommands(filepath)

    if (filepath.includes("Front.jsx")) {
        J.log("babelify")
        iMeanNothing = await willRunFixedCommand(commands.babelifyHapi)
        return iMeanNothing
            //iMeanNothing = await await J.willRunFixedCommand(commands.lintReact)

    } else if (filepath.includes(".jsx") && (filepath.includes("services") || filepath.includes("hot"))) {
        J.log("babelify")
        iMeanNothing = await willRunFixedCommand(commands.babelify)
            //iMeanNothing = await await J.willRunFixedCommand(commands.lintReact)
        return iMeanNothing

    } else if (filepath.includes(".jsx") && filepath.includes("fth")) {
        J.log("babelify")
        iMeanNothing = await willRunFixedCommand(commands.babelify)
            //iMeanNothing = await await J.willRunFixedCommand(commands.lintReact)
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

    } else if (filepath.includes(".js")) {
        J.log("lint")
        iMeanNothing = await willRunFixedCommand(commands.lint)
        return iMeanNothing

    } else {
        return false
    }
}

function factoryCommands(src) {
    let willReturn = {}
    let output = R.replace(/(Pre\.js)|(\.jsx)/g, ".js", src)
    let outputCss = R.replace(".less", ".css", src)
    let local = output.split("/")
    let name = local[ local.length - 1 ]
    let hapiLocation = `${__dirname}/hapi/public/${name}`
    let adminLocation = `admin/public/${name}`
    let presents = "-t [ babelify --presets [ es2015 react stage-3 stage-2 stage-1 stage-0 ] ]"
    let eslintConfigOverkill = "--fix --debug --max-warnings 100 -o tmp/eslint.txt --no-ignore --cache --cache-location tmp --config"
    let eslintConfig = "--fix --max-warnings 500 --no-ignore --cache --cache-location tmp"
    willReturn.lintReact = `eslint ${src} ${eslintConfig} .eslintrcReact.json`
    willReturn.lint = `eslint ${src} ${eslintConfig}`
    willReturn.less = `lessc ${src} ${outputCss}`
    willReturn.babel = `babel ${src} --out-file ${output}`
    willReturn.babelify = `browserify ${src} -o ${output} ${presents}`
    willReturn.babelifyHapi = `browserify ${src} -o ${hapiLocation} ${presents}`
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
