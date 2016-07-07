/// <reference path="./node.d.ts" />
/// <reference path="es6-promise.d.ts" />
import fs from "fs-extra"
//import Promise from "ts-promise"
import J = require("justdo")
function saveLog(data:string):Promise<string> {
    let logFile = `${__dirname}/zLog.txt`
    return new Promise((resolve)=>{
        fs.readFile(logFile, "utf8", (err, prevData)=>{
            fs.outputFile(logFile, `${data}\n${prevData}`, ()=> {
                resolve(true)
            })
        })
    })
}

saveLog("more").then((data)=>{
    J.log(data)
})
