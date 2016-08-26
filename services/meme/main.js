let J = require("./common")
var memecanvas = require("./memecanvas")
memecanvas.init("./dist", "-meme")
let path = "/home/just/ils/test/inc/images/dontMoveCat.png"
memecanvas.generate(path, "Top of Meme", "Bottom of Meme", function(error, memefilename) {
    if (error) {
        console.log(error)
    } else {
        console.log(memefilename)
    }
})
