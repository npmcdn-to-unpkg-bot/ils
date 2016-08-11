var fs = require("fs")
var imagemin = require("image-min")
var path = require("path")

var src = fs.createReadStream("img.gif")
var ext = path.extname(src.path)

src
    .pipe(imagemin({ ext: ext }))
    .pipe(fs.createWriteStream("img-minified" + ext))
