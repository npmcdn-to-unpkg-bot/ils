"use strict"
const R = require("ramda")
//const Immutable = require("immutable")
const winWidthIs = window.innerWidth
const winHeightIs = window.innerHeight

const singleWidth = divide(winWidthIs, 100)
const singleHeight = divide(winHeightIs, 100)

function divide(incomingNumber = 1, divideBy = 1) {
    return Math.floor(R.divide(incomingNumber, divideBy))
}

function getHeightPx(incomingPercent = 1, divideBy = winHeightIs) {
    return divide(incomingPercent, divideBy)
}

function getWidthPx(incomingPercent = 1, divideBy = winWidthIs) {
    return divide(incomingPercent, divideBy)
}

function randomSeed() {
    let willReturn = ""
    let data = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < 3; i++) {
        willReturn += data.charAt(Math.floor(Math.random() * data.length))
    }
    return willReturn
}

function shuffle(array) {
    let counter = array.length
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter)
        counter--
        let temp = array[ counter ]
        array[ counter ] = array[ index ]
        array[ index ] = temp
    }
    return array
}

let emitter = new Events()

function Events(target) {
    let events = {}, empty = []
    target = target || this
    target.on = function(type, func, ctx) {
        (events[ type ] = events[ type ] || []).push([func, ctx])
    }
    target.off = function(type, func) {
        type || (events = {})
        var list = events[ type ] || empty,
            i = list.length = func ? list.length : 0
        while (i--) func == list[ i ][ 0 ] && list.splice(i, 1)
    }
    target.emit = function(type) {
        let e = events[ type ] || empty, list = e.length > 0 ? e.slice(0, e.length) : e, i = 0, j
        while (j = list[ i++ ]) j[ 0 ].apply(j[ 1 ], empty.slice.call(arguments, 1))
    }
}

function isUniq(obj) {
    let arr = R.split(" ", obj[ "dePart" ])
    return R.uniq(arr).length === arr.length
}


module.exports.bulButtonInit = "button"
module.exports.bulButtonNext = "button is-success"
module.exports.buttonTextShowAnswer = "Show Answer"
module.exports.buttonTextNext = "Next"
module.exports.bulMobile = "is-hidden-desktop-only is-hidden-tablet-only is-hidden-widescreen"

module.exports.shuffle = shuffle
module.exports.isUniq = isUniq
module.exports.emitter = emitter
module.exports.divide = divide
module.exports.getHeightPx = getHeightPx
module.exports.getWidthPx = getWidthPx
module.exports.randomSeed = randomSeed
module.exports.winWidthIs = winWidthIs
module.exports.winHeightIs = winHeightIs
