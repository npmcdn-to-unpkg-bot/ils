"use strict";
var cheerio = require('cheerio')
var fetch = require('node-fetch')
var async = require('async')
var moment = require('moment')
var masterObject = {}
var urlMasterArr = []
var mongooseArr = []
var counter = 0
var countriesArr = ["AL","DZ","AR","AM","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BO","BA","BR","BG","KH","CM","CA","CL","CN","CO","CR","HR","CW","CY","CZ","DK","DO","EC","EG","SV","EE","FI","FR","PF","GE","DE","GH","GR","GP","GT","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KW","KG","LV","LB","LY","LT","LU","MO","MK","MG","MY","MT","MQ","MU","MX","MD","ME","MA","MM","NP","NL","NZ","NI","NG","NO","OM","PK","PS","PA","PY","PE","PH","PL","PT","PR","QA","RE","RO","RU","SA","SN","RS","SG","SK","SI","ZA","KR","ES","LK","SD","SE","CH","SY","TW","TZ","TH","TT","TN","TR","UG","UA","AE","GB","US","UY","UZ","VE","VN","YE"]
var countriesNamesArr = ["Albania","Algeria","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Bolivia","Bosnia and Herzegovina","Brazil","Bulgaria","Cambodia","Cameroon","Canada","Chile","China","Colombia","Costa Rica","Croatia","Curaçao","Cyprus","Czech Republic","Denmark","Dominican Republic","Ecuador","Egypt","El Salvador","Estonia","Finland","France","French Polynesia","Georgia","Germany","Ghana","Greece","Guadeloupe","Guatemala","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan","Latvia","Lebanon","Libya","Lithuania","Luxembourg","Macao","Macedonia","Madagascar","Malaysia","Malta","Martinique","Mauritius","Mexico","Moldova","Montenegro","Morocco","Myanmar","Nepal","Netherlands","New Zealand","Nicaragua","Nigeria","Norway","Oman","Pakistan","Palestinian Territory","Panama","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tanzania","Thailand","Trinidad and Tobago","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen"]
//$(".top li a").each(function(i, element){ var localHref = $(this).attr('href'); arr.push(localHref.substring(localHref.length-2));   })
var dbConn = require('../inc/dbConn.js')
var common = require('../inc/common.js')

function scraper(countryCode, callback) {
    fetch('http://www.alexa.com/topsites/countries' + countryCode).then(function(res) {
        if (res.status != 200) {
            console.log('scraper', countryCode, res.statusText);
            callback()
        }
        else {
            return res.text()
        }
    }).then(function(data) {
        var $ = cheerio.load(data)
        var localUrls = []
        var localNumbers = []
        var realCountryCode = countryCode.split('/')[1]

        $('p[class="desc-paragraph"]').each(function(i, elem) {
            var url = $(this).text().trim()
            localUrls.push(url.toLowerCase())
        })

        $('div[class="count"]').each(function(i, elem) {
            var num = $(this).text()
            localNumbers.push(num)
        })

        localUrls.map(function(urlValue, key) {
                var obj = {}
                if (masterObject[urlValue] !== undefined) {
                    masterObject[urlValue] += leadingZeros(localNumbers[key]) + '-' + realCountryCode + '|'
                }
                else {
                    urlMasterArr.push(urlValue)
                    masterObject[urlValue] = leadingZeros(localNumbers[key]) + '-' + realCountryCode + '|'
                }
            })
        console.log(`${realCountryCode} - ${localUrls.length} - ${localUrls[0]}`)
        setTimeout(callback, 300)
    })
}

function leadingZeros(num) {
    var s = "00" + num;
    return s.substr(s.length - 3);
}

function countryLooper(countryCode, callback) {
    var start = Date.now();
    var sitePositions = ''
    var numberCodeArrPerPage = []

    for (var i = 0; i < 19; i++) {
        numberCodeArrPerPage.push(';' + i + '/' + countryCode)
    }
    async.mapLimit(numberCodeArrPerPage, 1, scraper, function() {
        var timeTaken = Date.now() - start
        counter++
        console.log(`${timeTaken} miliseconds for ${countryCode} country`)
        console.log(`will scrape ${countriesArr.length-counter} more countries`)
        setTimeout(callback, 6000)
    })
}

function savingLooper(urlValue, callback) {
    var obj = {}
    var fbObj = {}
    fbObj[urlValue.replace(/\./g,"|")] = masterObject[urlValue]
    obj['urlKey'] = urlValue
    obj['value'] = masterObject[urlValue]
    common.savingCurrentVersion(fbObj, function(){
            console.log('saved to Firebase', obj)
            dbConn.createSingle(obj, function(){
                callback()
            })
        })
}

function wrapper(callback) {
    async.mapLimit(urlMasterArr, 1, savingLooper, function() {

        callback()
    })
}

var main = function(masterCallback) {

    async.mapLimit(countriesArr, 1, countryLooper, function() {
        console.log('SCRAPING IS DONE')
        wrapper(function() {
            masterCallback()
        })
    })
}

module.exports.main = main
