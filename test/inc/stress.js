const J = require("../common")
function main(url){
    resolve new Promise(resolve=>{
        //let command = `stresser https://ilearnsmarter.com -c 10000 -n 10 -t 20000 --html=${__dirname}/inc/stressTest-${(new Date).toGMTString()}.html --threads=16 --force`
        let command = `stresser ${url} -c 10000 -n 10 -t 20000 --html=false --threads=16 --force`
        J.willRunFixedCommand(command).then(data=>{
            resolve(data)
        })
    })
}
module.exports.main = main
// Legend:
//
// S = Number of Seconds since the test was started
// T = Number of requests completed in the given amount of time
// A = Number of requests active (still awaiting a response)
// E = Number of requests failed
// T/O = Number of requests timed out
// W/B = Number of requests that contain a response body
// AVG = Average response time in milliseconds
// MIN = Minimum response time in milliseconds
// MAX = Maximum response time in milliseconds
// 1xx = Number of HTTP code 100-199 responses
// 2xx = Number of HTTP code 200-299 responses
// 3xx = Number of HTTP code 300-399 responses
// 4xx = Number of HTTP code 400-499 responses
// 5xx = Number of HTTP code 500-599 responses
// NOT FINISHED = Number of requests that are unanswered and have been forcefully terminated (see option --force)
