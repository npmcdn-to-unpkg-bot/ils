"use strict"
const J = require("./common")
async function mainProcess(nvmVersion, prevNvmVersion) {
    let state
    state = await J.willRunFixedCommand(`nvm install v${nvmVersion}`)
    J.log(state)
    state = await J.willRunFixedCommand(`nvm alias default ${nvmVersion}`)
    J.log(state)
    state = await J.willRunFixedCommand(`nvm install node --reinstall-packages-from=v${prevNvmVersion}`)
    J.log(state)
    return state
}
function main(nvmVersion, prevNvmVersion) {
    return mainProcess(nvmVersion, prevNvmVersion)
}
function alt(nvmVersion, prevNvmVersion) {
    return new Promise(resolve=>{
        J.willRunFixedCommand(`nvm install v${nvmVersion}`).then(()=>{
            J.willRunFixedCommand(`nvm alias default ${nvmVersion}`).then(()=>{
                J.willRunFixedCommand(`nvm install node --reinstall-packages-from=v${prevNvmVersion}`).then(()=>{
                    resolve(true)
                })
            })
        })
    })
}
module.exports.main = main
module.exports.alt = alt
