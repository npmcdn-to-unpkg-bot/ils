var second = require('./wordlistSecond.js')
var third = require('./wordlistThird.js')
var fourth = require('./wordlistFourth.js')
var R = require('ramda')
var mainArr = R.append(fourth.fourth, third.third)
mainArr = R.append(mainArr, second.nounArr)
mainArr = R.append(mainArr, second.verbList)
module.exports = {
    get: function(){
        var ss = mainArr.length;
        var index = Math.floor(Math.random() * ss);
        return mainArr[index];
    },
    getNoun: function(){
        var ss = second.nounArr.length;
        var index = Math.floor(Math.random() * ss);
        return second.nounArr[index];
    },
    getVerb: function(){
    var ss = second.verbList.length;
    var index = Math.floor(Math.random() * ss);
    return second.verbList[index];
}
}