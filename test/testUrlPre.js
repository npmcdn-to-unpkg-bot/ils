var J = require('../common')
var fs = require('fs-extra')
var yellowLab = require('./inc/yellowLab')
var stress = require('./inc/stress')
let outputDirectory = `${J.oneLevelUp(__dirname)}/hapi/public/reports/`
async function mainAsync(url){
    let willReturn = {}
    willReturn.yellowLab = await yellowLab.main(url)
    willReturn.stress = await stress.main(url)
    return willReturn
}
function main(url){
    return new Promise(resolve=>{
        mainAsync(url).then(data=>{
            resolve(data)
        })
    })
}
module.exports.main = main
