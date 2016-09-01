const env = require("dotenv-helper")
const J = require("./common")
function main(url) {
    return Promise(resolve=>{
        J.willRunFixedCommand(`webpagetest --server=https://www.webpagetest.org/ --key=${env.getEnv("webpagetest")} test ${url}`)
    })
}
module.exports.main = main
