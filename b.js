const J = require("./common")
J.postData("https://ilearnsmarter.com/readRandom/main", {})
.then(res=>{
    J.lg(res)
})
