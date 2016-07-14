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
let fontValueFn = R.cond([
	[R.gte(30), R.always(15)],
	[R.both(R.lt(30), R.gte(48)), R.always(13)],
	[R.T, R.always(16)]
])
J.log(fontValueFn(33))
