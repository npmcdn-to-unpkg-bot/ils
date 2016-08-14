const psi = require('psi');
function main(url){
    return new Promise(resolve=>{
        psi('https://ilearnsmarter.com/about').then(data => {
            let willReturn = {}
            willReturn.score = data.ruleGroups.SPEED.score
            willReturn.stats = data.pageStats
        })
    })
}
module.exports.main = main
// https://github.com/addyosmani/psi
