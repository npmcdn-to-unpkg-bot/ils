"use strict"
const env = require("dotenv-helper")
const fs = require("fs-extra")
let cwd = env.getEnv("dirname")
var glob = require("glob")

function main(){
    return new Promise(resolve=>{
        glob("*-*-*-*-*", {cwd},  (err, files)=>{
            console.log(files)
            files.map(val=>{
                fs.removeSync(`${cwd}/${val}`)
            })
            resolve(true)
        })

    })
}
module.exports.main = main
