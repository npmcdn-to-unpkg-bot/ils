var scrape = require("scrape-url")

module.exports = {
    get: function (word,callback) {
        scrape("http://www.verbformen.net/conjugation/?i=" + word.toLowerCase(),["#ueberblick .v tr","#indikativaufzu .v tr"],function (error,matches,matchesSecond) {
            var willReturn = []

            matches.map(function(value,key) {
                if(key == 2 || key == 8) {
                    willReturn.push(value.text())
                }
            })
            matchesSecond.map(function(value,key) {
                if(key == 14 || key == 26) {
                    willReturn.push(value.text())
                }
            })
            callback(null,willReturn)
        })
    },
    getNoMore: function (word,callback) {
        var ss = "http://www.verbix.com/webverbix/German/" + word + ".html"
        scrape(ss,"div.spacer div div:nth-child(3) table p",function (error,matches) {
            if(matches.length == 0) {
                callback(null,null)
                return
            }
            var ss = [],exit_rf_rf = [],parse_rf = []
            ss[ 0 ] = matches[ 0 ].text().toString()
            ss[ 1 ] = matches[ 1 ].text().toString()
            ss[ 2 ] = matches[ 2 ].text().toString()
            ss[ 3 ] = matches[ 3 ].text().toString()
            var pattern = /([a-zA-Z])+/g
            for(var i = 0; i < ss.length; i++) {
                parse_rf = ss[ i ].match(pattern)
                if(i === 0 || i === 2) {
                    exit_rf_rf.push(parse_rf[ 0 ])
                    exit_rf_rf.push(parse_rf[ 1 ] + " " + parse_rf[ 2 ])
                    exit_rf_rf.push(parse_rf[ 5 ] + " " + parse_rf[ 6 ])
                } else{
                    exit_rf_rf.push(parse_rf[ 0 ])
                    exit_rf_rf.push(parse_rf[ 1 ] + " " + parse_rf[ 2 ] + " " + parse_rf[ 3 ])
                    exit_rf_rf.push(parse_rf[ 7 ] + " " + parse_rf[ 8 ] + " " + parse_rf[ 9 ])
                }
                if(exit_rf_rf.length == 12) {
                    callback(null,[exit_rf_rf,[]])// required as inputsocket fn is expecting two arrays
                }
            }
        })
    }
}
