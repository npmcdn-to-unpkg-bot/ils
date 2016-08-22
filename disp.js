"use strict"
const J = require("justdo")
const R = require("ramda")
const argv = require("minimist")(process.argv.slice(2))
const backup = require("./services/backup/main")
const spdyClean = require("./zSpdyClean")
const nvm = require("./zNvm")
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
        if (command === "nvm") {
            //nvm.main(commandArgument).then(()=>{resolve(true)})
            nvm.alt("6.4.0","6.3.1").then(()=>{
                resolve(true)
            })
        }
        if (command === "nvmAlt") {
            nvm.alt("6.4.0","6.3.1").then(()=>{
                resolve(true)
            })
            // nvm.alt(commandArgument).then(()=>{
            //     resolve(true)
            // })
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
