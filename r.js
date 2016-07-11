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
const dbPath = "/home/just/ils/hapi/public/_db.json"
const dbPathRaw = "/home/just/ils/hapi/public/_dbRaw.json"
console.log(fs.readJsonSync(dbPath).data)
