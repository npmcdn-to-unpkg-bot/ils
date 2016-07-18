"use strict"
const fs = require("fs-extra")
const cachePath = "hapi/public/cache"
const cachePathSecond = "hapi/cache"
fs.removeSync(cachePath)
fs.removeSync(cachePathSecond)
fs.mkdirsSync(cachePath)
fs.mkdirsSync(cachePathSecond)
