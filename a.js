let J = require("./common")
var memecanvas = require("./services/meme/main.js")
memecanvas.init("./dist", "-meme")
let path = "/home/just/ils/test/inc/images/dontMoveCat.png"
let styleObj = {
    fillStyle: "#333",
    strokeStyle: "#aaa",
    lineWidth: 6,
    fontFamily: "Ubuntu"
}
memecanvas.generate(path, "dsdssds", "Bottom of Meme", styleObj, function(error, memefilename) {
    if (error) {
        console.log(error)
    } else {
        console.log(memefilename)
    }
})
