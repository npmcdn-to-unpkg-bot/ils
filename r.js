"use strict"
const J = require("justdo")
const R = require("ramda")
const RFantasy = require('ramda-fantasy')
const Either = RFantasy.Either
const Future = RFantasy.Future
const Identity = RFantasy.Identity
const Maybe = RFantasy.Maybe
const Just = RFantasy.Just
let str = `"Adel verpflichtet." - nach Pierre-Marc-Gaston de Lévis, Maximes et réflections`
let just = `"Adel verpflichtet."`
let state = R.compose(R.replace(`"`,""),R.head,R.split(`."`))
let only = R.compose(R.head,R.split(`."`))
console.log(state(str))
console.log(state(just))