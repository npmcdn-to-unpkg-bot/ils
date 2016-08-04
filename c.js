"use strict"
const J = require("./common")
const R = require("ramda")
const env = require("dotenv-helper")
const reqwest = require("reqwest")
//J.willRequest("http://ilearnsmarter.com").then(J.log)
reqwest({
    //url:  "http://ilearnsmarter.com/read/translateDraft",
    //url:  "http://localhost:3000/updateMany/main",
    url:  "http://localhost:3000/readRandom/counter",
    data: {
        password: env.getEnv("mainPassword"),
        id: 2,
        obj: JSON.stringify({
            category: "jokes",
            childSafetyFlag: true
        })
    },
    method:  "post",
    error: (err) => {
        console.log(err)
    },
    success: (incoming)=> {
        J.lg(incoming)
    }
})
