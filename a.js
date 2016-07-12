"use strict";

var fs = require("fs-extra");
var scrapeIt = require("scrape-it");
var cheerio = require("cheerio");
var fetch = require("node-fetch");
var request = require("request");
var J = require("justdo");
var R = require("ramda");
var dbPath = "/home/just/ils/hapi/public/_db.json";
var dbPathRaw = "/home/just/ils/hapi/public/_dbRaw.json";
var removeLongSentences = R.compose(R.lt(R.__, 3), R.length, R.split("."));
var id = fs.readJsonSync(dbPath).nextIndex;
var willSave = {};

//fs.readJson(dbPath, (err, dbState)=> {
//test(dbState.nextIndex).then((incoming)=>{
//dbState.data = R.merge(dbState.data, incoming.willReturn)
//dbState.nextIndex = incoming.id
