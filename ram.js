"use strict"
const R = require("ramda")
const J = require("justdo")
const RFantasy = require("ramda-fantasy")
const IO = RFantasy.IO
const Either = RFantasy.Either
const Future = RFantasy.Future
const Maybe = RFantasy.Maybe
const Just = RFantasy.Just

function regularPromise() {
    J.log(0)
    return new Promise((resolve)=>{
        J.lg(1)
        setTimeout(()=>{
            resolve(true)
        },300)
    })
}

function lazyPromise() {
    J.log(7)
    return new Future((reject,resolve)=>{
        J.log(8)
        setTimeout(()=>{
            resolve(true)
        },5000)
    })
}
function promiseHost() {
    J.log(77)
    return new Promise((reject,resolve)=>{
        J.log(87)
        regularPromise().then(()=>{
            return resolve(false)
        })
        lazyPromise().fork(resolve,resolve)


    })
}
function lazyPromiseHost() {
    J.log(77)
    return new Future((reject,resolve)=>{
        J.log(87)
        setTimeout(()=>{
            regularPromise().then(()=>{
                return resolve(false)
            })
            lazyPromise().fork(resolve,resolve)
        },5000)

    })
}

// regularPromise().then(J.lg)
promiseHost().then(console.log,console.log)
// willResolve.map((a)=>{
//     return a
// }).fork(err => console.error(err),data => {
//     console.log(data)
//     return data
// })


// let just = IO(() => R.tail(process.argv))
// let only = just.map((a)=> a + "more").runIO()
