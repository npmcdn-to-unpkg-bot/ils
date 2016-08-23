"use strict"
const J = require("justdo")
const R = require("ramda")
const env = require("dotenv-helper")
const argv = require("minimist")(process.argv.slice(2))
const backup = require("./services/backup/main")
const spdyClean = require("./zSpdyClean")
const translateDraftGenerator = require("./_inc/translateDraftGenerator")
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
        if (command === "translateDraft") {
            translateDraftGenerator.alt().then(data=>{
                resolve(data)
            })
        }
        if (command === "spdyClean") {
            spdyClean.main().then(()=>{
                resolve(true)
            })
        }
        if (command === "adminIp") {
            let adminIpData = env.getEnvSecure("adminIp")
            env.delEnv("adminIp").then(()=>{
                env.addEnv("adminIp",`${adminIpData},${commandArgument}`).then(data=>{
                    resolve(data)
                })
            })
        }
        if (command === "removeAdminIp") {
            let adminIpData = R.compose(R.join(","),R.filter(val=>val!==commandArgument))(env.getEnvSecure("adminIp"))
            J.log(adminIpData)
            env.delEnv("adminIp").then(()=>{
                env.addEnv("adminIp",adminIpData).then(data=>{
                    resolve(data)
                })
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
