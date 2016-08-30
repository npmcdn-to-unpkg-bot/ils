let J = require("./common")
async function main() {
    let state = await J.willRunFixedCommand("free")
    state = await J.willRunFixedCommand("free")
    return state
}
main().then(console.log)
