"use strict"
const J = require("./common")
async function mainProcess(nvmVersion) {
    let token = J.randomSeed()
    let state = await J.willRunFixedCommand(`nvm install v${nvmVersion}`)
    state = await J.willRunFixedCommand(`nvm alias default ${nvmVersion}`)
    state = await J.willRunFixedCommand(`nvm install node --reinstall-packages-from=v${nvmVersion}`)
    return state
}
function main(nvmVersion) {
    return mainProcess(nvmVersion)
}
function alt(nvmVersion) {
    return new Promise(resolve=>{
        mainProcess(nvmVersion).then(data=>{
            resolve(data)
        })
    })
}
module.exports.main = main
module.exports.alt = alt
