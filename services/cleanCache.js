"use strict"
const env = require("dotenv-helper")
const fs = require("fs-extra")
const cachePathPublic = `${env.getEnv("dirname")}/hapi/public/cache`
const cachePath = `${env.getEnv("dirname")}/hapi/cache`
function main(){
    return new Promise(resolve=>{
        fs.removeSync(cachePath)
        fs.removeSync(cachePathSecond)
        fs.mkdirsSync(cachePath)
        fs.mkdirsSync(cachePathSecond)
        resolve(true)
    })
}
module.exports.main = main
