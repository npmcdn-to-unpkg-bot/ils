const J = require("../../common")
const fs = require("fs-extra")

function main(){
    return new Promise(resolve=>{
        J.postData(`${J.ils}/imageless`,{}).then(data=>{
            J.log(data)
            let prevData = fs.readJsonSync('db.json').data
            if(prevData.length<data.length){
                fs.writeJsonSync('db.json', {data})
            }else{
                resolve(false)
            }
        })
    })
}
main()
