"use strict"
const J = require("./common")
const R = require("ramda")
const fs = require("fs-extra")
const db = require("proud-db")
const translate = require("./admin/_inc/translate.js")
let words = require("./words")
db.loadAll().then(J.log)
//translate.deEn("wenig").then(incoming=>{
//db.saveParent("test",incoming).then(J.lg)
//fs.writeJsonSync("temp.json", {data: incoming})
//})
