var every = require('schedule').every
var moment = require('moment')
var common = require("./include/common.js")
var R = require('ramda')
var _url = "https://nodejs5-peeping4dsun.c9users.io/"



function alexaScrapingCron(){
    common.getting(_url+'startScraping', function(res){
      common.logging('alexaSearch', 'success', function(){
        console.log('logged to Firebase')
      })
      console.log('done working', res)
    })
}

function gifsCron(cb){
    common.getting(_url+'startGifsCron', function(res){
      common.logging('startGifsCron', 'success', function(){
        console.log('startGifsCron logged to Firebase')
      })
      console.log('done startGifsCron', res)
    })
}
//working()
var willOnce = R.once(alexaScrapingCron())
var willOnceGifsCron = R.once(gifsCron())
var gifsCronCounter = 0

every('1h').do(function() {
  var currentDay = moment().format('dddd')
  var currentHour = moment().format('hh') // as for creating timezones
  if(gifsCronCounter>7||gifsCronCounter==0){// as i dont need additional timout
    gifsCron(function(){
      gifsCronCounter++
    })
  }else{
    gifsCronCounter = 0
  }

  if(currentDay==="Sunday"){
      willOnce()
  }
})
