const exec = require("child_process").exec
function willRunFixedCommand(commandIs) {
    return new Promise((resolve)=>{
        let willReturn = []
        let proc = exec(commandIs)
        proc.stdout.on("data", function(chunk) {
            willReturn.push(chunk.toString())
        })
        proc.stdout.on("error", function(error) {
            console.error(error)
        })
        proc.stdout.on("end", function() {
            resolve(willReturn)
        })
        proc.stdout.on("error", function(error) {
            console.error(error)
            resolve(error)
        })
    })
}
function main(url) {
    return new Promise(resolve=>{
        willRunFixedCommand(`sitespeed.io -u ${url} --storeJson`).then(data=>{
            resolve(data)
        })
    })
}
module.exports.main = main
