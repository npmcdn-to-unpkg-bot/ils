"use strict"
const J = require("justdo")
const R = require("ramda")
const argv = require("minimist")(process.argv.slice(2))
const backup = require("./services/backup/main")
const url = require("./services/testUrl/main")
//$ node example/parse.js -a beep -b boop
//{ _: [], a: 'beep', b: 'boop' }
let commandArgument
function main(command) {
    return new Promise(resolve=>{
        if (command === "backup") {
            backup.main().then(data=>{
                resolve(data)
            })
        }
        if (command === "url") {
            url.ils(commandArgument).then(data=>{
                J.log(R.path(["yellowLab", "scoreProfiles", "generic", "globalScore"], data), "Yellow Lab Score")
                J.log(R.path(["pageSpeedInsights", "score"], data), "Page Speed Insights Score")
                J.log(R.path(["browserPerf", "0", "loadTime"], data), "Browser Perf loadTime")
                J.log(R.path(["browserPerf", "0", "domReadyTime"], data), "Browser Perf domReadyTime")
                resolve("")
            })
        }
        if (command === "urlAll") {
            url.main(commandArgument).then(data=>{
                J.log(R.path(["yellowLab", "scoreProfiles", "generic", "globalScore"], data.ils), "Yellow Lab Score")
                J.log(R.path(["yellowLab", "scoreProfiles", "generic", "globalScore"], data.localhost), "Yellow Lab Score localhost")
                J.log(R.path(["pageSpeedInsights", "score"], data.ils), "Page Speed Insights Score")
                J.log(R.path(["browserPerf", "0", "loadTime"], data.ils), "Browser Perf loadTime")
                J.log(R.path(["browserPerf", "0", "loadTime"], data.localhost), "Browser Perf loadTime localhost")
                J.log(R.path(["browserPerf", "0", "domReadyTime"], data.ils), "Browser Perf domReadyTime")
                J.log(R.path(["browserPerf", "0", "domReadyTime"], data.localhost), "Browser Perf domReadyTime localhost")
                resolve("")
            })
        }
    })
}
if (argv._.length === 1) {
    main(argv._[ 0 ]).then(data=>{
        J.log(data)
    })
}
if (argv._.length === 2) {
    commandArgument = argv._[ 1 ]
    main(argv._[ 0 ]).then(data=>{
        J.log(data)
    })
}
