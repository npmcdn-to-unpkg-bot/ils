var Bing = require("node-bing-api")({accKey: ""})
function objProve(obj,firstProp,secondProp) {
    var flag
    if(obj !== undefined) {
        if(obj[ firstProp ] !== undefined) {
            if(obj[ firstProp ][ secondProp ] !== undefined) {
                flag = obj[ firstProp ][ secondProp ]
            } else{
                flag = false
            }
        } else{
            flag = false
        }
    } else{
        flag = false
    }
    return flag
}
module.exports = {
    image: function (word,callback) {
        Bing.images(word,{
            top: 64,
            imagefilters: {
                size: "large",
                style: "photo"
            }
        },function (error,resp,body) {
            var ss = body.d.results
            var end = []

            ss.map(function (val,key) {
                console.log(val[ "MediaUrl" ])
                end.push(val[ "MediaUrl" ])
            })
            callback(null,end)
        })
    },
    singleImage: function (word,callback) {
        Bing.images(word.trim(),{
            top: 3,
            imagefilters: {
                size: "medium",
                style: "photo"
            }
        },function (error,resp,body) {
            var just = objProve(body,"d","results")
            if(just == false) {
                callback("error",null)
            } else{
                callback(null,just[ 0 ][ "MediaUrl" ])
            }
            /* if(body==undefined){
                callback('error',null)
            }else{
                var ss = body.d.results;
                if(ss.length!==0){
                    callback(null, ss[0]['MediaUrl']);
                }else{
                    callback('error',null)
                }
            }*/
        })
    },
    context: function (word,callback) {
        Bing.web(word,{
            top: 10,  // Number of results (max 50)
            skip: 3
        },function (error,resp,body) {
            var ss = body.d.results
            var end = []

            ss.map(function (val,key) {
                end.push(val[ "Description" ])
            })
            callback(null,end)
        })
    },
    exactContext: function (word,callback) {
        var isWord = word.replace(/\s/g,"+")
        isWord = "\"" + isWord + "\""
        Bing.web(isWord,{
            top: 10,  // Number of results (max 50)
            skip: 3
        },function (error,resp,body) {
            var ss = body.d.results
            var end = []

            ss.map(function (val,key) {
                end.push(val[ "Description" ])
            })
            callback(null,end)
        })
    }
}
