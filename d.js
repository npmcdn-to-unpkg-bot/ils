const J = require('justdo')
const argv = require('minimist')(process.argv.slice(2))
const backup = require("./services/backup/main")
// $ node example/parse.js -a beep -b boop
// { _: [], a: 'beep', b: 'boop' }
function main(command){
    return new Promise(resolve=>{
        if(command==="backup"){
            backup.main().then(data=>{
                resolve(data)
            })
        }
    })
}
if(argv._.length===1){
    main(argv._[0]).then(data=>{
        J.log(data)
    })
}
