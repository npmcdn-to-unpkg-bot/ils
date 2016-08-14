var ylt = require('yellowlabtools');

function main(url){
    return new Promise(resolve=>{
        ylt(url).then(data=>{
            resolve(data)
        }).fail(err=>{
            console.error(err);
                resolve(null)
        })
    })
}
module.exports.main = main
