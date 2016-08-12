"use strict"
const J = require("./common")
const R = require("ramda")
const K = require("kefir")
const Observable = require("zen-observable")
const RFantasy = require("ramda-fantasy")
const fs = require("fs-extra")
const Either = RFantasy.Either
const Future = RFantasy.Future
const Identity = RFantasy.Identity
const Maybe = RFantasy.Maybe
const Just = RFantasy.Just
var observed = K.fromESObservable(new Observable(observer => {
    let willReturn = Math.random() * 10
    delay().then(()=>{
        willReturn = Math.random() * 100
        observer.next(willReturn)
        willReturn = Math.random() * 100
        delay().then(()=>{
            observer.next(willReturn)
            willReturn = Math.random() * 100
            delay().then(()=>{
                willReturn = Math.random() * 100
                observer.next(willReturn)
                willReturn = Math.random() * 100
                delay().then(()=>{
                    willReturn = Math.random() * 100
                    observer.complete(willReturn)
                })
            })
        })
    })
}))
var observedSecond = K.fromESObservable(new Observable(observer => {
    let willReturn = Math.random() * 100 > 500 ? true : false
    delay(2000).then(()=>{
        observer.next(true)
        willReturn = Math.random() * 100 > 500 ? true : false
        delay(2000).then(()=>{
            observer.next(false)
            willReturn = Math.random() * 100 > 500 ? true : false
            delay(2000).then(()=>{
                observer.next(false)
                delay().then(()=>{
                    observer.complete(willReturn)
                })
            })
        })
    })
}))
//let result = K.combine([observed, observedSecond], (a, b)=> `here ${a} ${b}`)
//result.log()
function delay(ms = 1000) {
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(Math.random() * ms)
        }, ms)
    })
}
function delayFn(ms = 1000) {
    return new Promise(resolve=>{
        setTimeout(()=>{
            if ((Math.random() * ms) > 500) {resolve(true)} else {resolve(false)}
        }, ms)
    })
}
function* nums() {
    console.log("starting")
    yield 1
    console.log("yielded 1")
    yield 2
    console.log("yielded 2")
    yield 3
    console.log("yielded 3")
}
var generator = nums()
generator.next()  //{ value: 1, done: false }
//"starting"
generator.next()  //{ value: 2, done: false }
//"yielded 1"
generator.next()  //{ value: 3, done: false }
//"yielded 2"
generator.next()
function* summer() {
    let sum = 0, value
    while (true) {
        //receive sent value
        value = yield
        if (value === null) break

        //aggregate values
        sum += value
    }
    return true
}
generator = summer()

//proceed until the first "yield" expression, ignoring the "value" argument
generator.next()

//from this point on, the generator aggregates values until we send "null"
generator.next(1)
generator.next(10)
generator.next(100)

//close the generator and collect the result
let sum = generator.next(null)
J.lg(sum)
