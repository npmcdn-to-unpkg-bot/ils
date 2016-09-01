"use strict"
const express = require("express")
let router = express.Router()
const recursive = require("recursive-readdir")
router.get("/file/:name", function (req, res, next) {
        let options = {
            root: "/home/just/Downloads/mp3",
            dotfiles: "deny",
            headers: {
                "x-timestamp": Date.now(),
                "x-sent": true
            }
        }
        let fileName = req.params.name
        res.sendFile(decodeURI(fileName), options, function (err) {
            if (err) {
                console.log(err)
                res.status(err.status).end()
            }
            else {
                console.log("Sent:", fileName)
            }
        })
})
router.get("/files", function (req, res, next) {
        recursive("/home/just/Downloads/mp3", function (err, files) {
            res.send(files)
        })
})

module.exports = router
