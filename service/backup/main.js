const J = require("../../common")
const fs = require("fs-extra")
const R = require("ramda")
let fileLocation = `${__dirname}/db.json`
function learningMeme(){
    return new Promise(resolve=>{
        let searchObj = {
            key:"$where",
            keyValue: "this.imageSrc!==undefined&&this.imageSrc!==false"
        }
        J.postData(`${J.ils}/readWholeModel/main`,searchObj).then(data=>{
            let prevData = fs.readJsonSync(fileLocation)
            if(prevData.learningMeme.length<data.length){
                fs.writeJsonSync(fileLocation, R.merge(prevData,{learningMeme: data}))
                resolve(true)
            }else{
                resolve(false)
            }
        })
    })
}
function blog(){
    return new Promise(resolve=>{
        J.postData(`${J.ils}/blogPosts`,{}).then(data=>{
            let prevData = fs.readJsonSync(fileLocation)
            if(prevData.blog.length<data.length){
                fs.writeJsonSync(fileLocation, R.merge(prevData,{blog: data}))
                resolve(true)
            }else{
                resolve(false)
            }
        })
    })
}
function main(){
    return new Promise(resolve=>{
        learningMeme().then(learningMemeResult=>{
            blog().then(blogResult=>{
                resolve(learningMemeResult||blogResult)
            })
        })
    })
}
module.exports.main = main
