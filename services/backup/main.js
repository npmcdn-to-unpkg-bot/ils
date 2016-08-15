const J = require("../../common")
const fs = require("fs-extra")
let fileLocation = `${__dirname}/db.json`
function main(){
    return new Promise(resolve=>{
        let searchObj = {
            key:"$where",
            keyValue: "this.imageSrc!==undefined&&this.imageSrc!==false"
        }
        J.postData(`${J.ils}/readWholeModel/main`,searchObj).then(data=>{
            let prevData = fs.readJsonSync(fileLocation).data
            if(prevData.length<data.length){
                fs.writeJsonSync(fileLocation, {data})
                resolve(true)
            }else{
                resolve(false)
            }
        })
    })
}

module.exports.main = main
