var Twit = require("twit")

var T = new Twit({
    consumer_key:         ""
    ,consumer_secret:      ""
    ,access_token:         ""
    ,access_token_secret:  ""
})

module.exports = {
    get: function(word,callback) {
        var query = word + " since:2010-05-11 lang:de min_retweets:0 min_faves:0"
        T.get("search/tweets",{ q: query,count: 350 },function(err,data,response) {
            var willSend = []
            var tempArray = data.statuses
            tempArray.map(function(value) {
                willSend.push(value.text)
            })
            callback(null,willSend)
        })
    },
    images: function(word,callback) {
        var query = word + ""
        T.get("search/tweets",{ q: query,count: 1 },function(err,data,response) {
            console.log(data.statuses)
            callback(JSON.stringify(data))
        })
    }
}
