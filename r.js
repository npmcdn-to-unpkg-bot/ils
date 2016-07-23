"use strict"
const J = require("./common")
const R = require("ramda")
const RFantasy = require("ramda-fantasy")
const fs = require("fs-extra")
const Either = RFantasy.Either
const Future = RFantasy.Future
const Identity = RFantasy.Identity
const Maybe = RFantasy.Maybe
const Just = RFantasy.Just
//fs.writeFileSync("temp3.txt", JSON.stringify(R.flatten([arr, arr2])))
function* nums() {
    console.log('starting');
    yield 1;
    console.log('yielded 1');
    yield 2;
    console.log('yielded 2');
    yield 3;
    console.log('yielded 3');
}
var generator = nums();

generator.next();  // { value: 1, done: false }
// "starting"
generator.next();  // { value: 2, done: false }
// "yielded 1"
generator.next();  // { value: 3, done: false }
// "yielded 2"
generator.next();
function* summer() {
    let sum = 0, value;
    while (true) {
        // receive sent value
        value = yield;
        if (value === null) break;

        // aggregate values
        sum += value;
    }
    return true;
}
 generator = summer();

// proceed until the first "yield" expression, ignoring the "value" argument
generator.next();

// from this point on, the generator aggregates values until we send "null"
generator.next(1);
generator.next(10);
generator.next(100);

// close the generator and collect the result
let sum = generator.next(null)
J.lg(sum)