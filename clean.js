const del = require('del')
function main(){
    return new Promise(resolve=>{
        del(["*-*-*-*-*"]).then(paths => {
            resolve('Deleted files and folders:\n', paths.join('\n'));
        })
    })
}
main().then(console.log)
