const psi = require("psi")
function main(url) {
    return new Promise(resolve=>{
        psi(url).then(data => {
            let willReturn = {}
            willReturn.score = data.ruleGroups.SPEED.score
            willReturn.stats = data.pageStats
            resolve(willReturn)
        })
    })
}
module.exports.main = main
//https://github.com/addyosmani/psi
