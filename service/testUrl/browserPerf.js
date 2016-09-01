const browserPerf = require("browser-perf")
function main(url) {
    return new Promise(resolve=>{
        browserPerf(url, (err, data)=>{
            if (err) {
                console.log("ERROR: " + err)
                resolve(null)
            } else {
                resolve(data)
            }
        }, {
            selenium: "http://localhost:4444/wd/hub",
            browsers: ["chrome"]
        })
    })
}
module.exports.main = main
