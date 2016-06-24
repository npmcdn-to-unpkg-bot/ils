var request = require("request")
module.exports = {
    get: function(word,callback) {
        var queryUrl = "http://api.wordnik.com/v4/word.json/" + word.trim() + "/relatedWords?useCanonical=true&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=seewordlingEnv"
        request(queryUrl,function (err,response,body) {
            if(err) {

            }
            var obj = JSON.parse(body)
            callback(null,obj[ 0 ].words)
        })
    }
}
