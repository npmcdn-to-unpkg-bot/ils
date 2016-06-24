var request = require("request")
var iconv = require("iconv-lite")
var cheerio = require("cheerio")
var firstUrl = function (word) {
    return"http://zitatezumnachdenken.com/?s=" + word
}
var secondUrl = function (word) {
    return"http://www.zitate-online.de/stichworte/" + word + "/"
}
var thirdUrl = function (word) {
    return"http://zitate.net/zitate/suche.html?query=" + word
}
module.exports = {
    get: function (word,callback) {
        var willReturn = []
        request.get({
            uri: firstUrl(word),
            encoding: null
        },
            function (err,resp,body) {
                var bodyWithCorrectEncoding = iconv.decode(body,"UTF-8")
                var regexRule = new RegExp("(<div).{0,100}(class).{0,40}(stripex){1}(.|\n){2,350}?(<\/div>)","gm")
                var regexResult = bodyWithCorrectEncoding.match(regexRule)
                if(regexResult !== null) {
                    regexResult.map(function (value) {
                        $ = cheerio.load(value)
                        var just = $("p").text().trim()
                        willReturn.push(just.substring(0,just.length - 1))
                    })
                }
                callback(null,willReturn)
            })
    },
    getSecond: function (word,callback) {
        console.log("accepted")
        var willReturn = []
        request.get({
            uri: secondUrl(word),
            encoding: null
        },
            function (err,resp,body) {
                var bodyWithCorrectEncoding = iconv.decode(body,"iso-8859-15")
                var regexRule = new RegExp("(<p).{0,100}(class).{0,40}(witztext){1}(.|\n){2,350}?(<\/p>)","gm")
                var regexResult = bodyWithCorrectEncoding.match(regexRule)
                if(regexResult !== null) {
                    regexResult.map(function (value) {
                        $ = cheerio.load(value)
                        var just = $("p").text().trim()
                        willReturn.push(just.substring(1,just.length - 1))
                    })
                }
                console.log("step1")
                request.get({
                    uri: thirdUrl(word),
                    encoding: null
                },
                    function (err,resp,body) {
                        console.log("step2")
                        var bodyWithCorrectEncoding = iconv.decode(body,"UTF-8")
                        var regexRule = new RegExp("(<span).{0,100}(class).{0,40}(quote){1}(.|\n){2,350}?(<\/span>)","gm")
                        var regexResult = bodyWithCorrectEncoding.match(regexRule)
                        if(regexResult !== null) {
                            regexResult.map(function (value) {
                                $ = cheerio.load(value)
                                var just = $("span").text().trim()
                                willReturn.push(just.substring(0,just.length - 1))
                            })
                        }
                        callback(null,willReturn)
                    })
            })
    }
}