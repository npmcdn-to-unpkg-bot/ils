const exec = require("child_process").exec
willRunFixedCommand("sitespeed.io -u http://localhost:3000").then(console.log)
//willRunFixedCommand("sitespeed.io -u http://ilearnsmarter.com").then(J.lg)
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
