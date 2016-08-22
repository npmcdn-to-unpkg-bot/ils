const format = require('distro-mic').format;
const J = require("./common")

function main(url){
    return new Promise(resolve=>{
        J.getData(J.ils).then(data=>{
            var output = format(data)
            resolve(output.amp)
        })
    })
}
module.exports.main = main
