"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var deEnTimerAsync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(wordRaw) {
        var willReturn, word, local;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        willReturn = {};
                        word = wordRaw.trim().toLowerCase();

                        console.time("mixed");
                        _context.next = 5;
                        return mixed(word);

                    case 5:
                        local = _context.sent;

                        console.timeEnd("mixed");
                        willReturn.deEnFirst = local.translation;
                        console.time("deEnThird");
                        _context.next = 11;
                        return deEnThird(word);

                    case 11:
                        willReturn.deEnThird = _context.sent;

                        console.timeEnd("deEnThird");
                        console.time("phraseFirst");
                        _context.next = 16;
                        return phraseFirst(word);

                    case 16:
                        willReturn.phraseFirst = _context.sent;

                        console.timeEnd("phraseFirst");
                        console.time("phraseSecond");
                        _context.next = 21;
                        return phraseSecond(word);

                    case 21:
                        willReturn.phraseSecond = _context.sent;

                        console.timeEnd("phraseSecond");
                        console.time("phraseThird");
                        _context.next = 26;
                        return phraseThird(word);

                    case 26:
                        willReturn.phraseThird = _context.sent;

                        console.timeEnd("phraseThird");
                        console.time("phraseFourth");
                        _context.next = 31;
                        return phraseFourth(word);

                    case 31:
                        willReturn.phraseFourth = _context.sent;

                        console.timeEnd("phraseFourth");
                        console.time("phraseFifth");
                        _context.next = 36;
                        return phraseFifth(word);

                    case 36:
                        willReturn.phraseFifth = _context.sent;

                        console.timeEnd("phraseFifth");
                        console.time("phraseSixth");
                        _context.next = 41;
                        return phraseSixth(word);

                    case 41:
                        willReturn.phraseSixth = _context.sent;

                        console.timeEnd("phraseSixth");
                        console.time("synonymFirst");
                        _context.next = 46;
                        return synonymFirst(word);

                    case 46:
                        willReturn.synonymFirst = _context.sent;

                        console.timeEnd("synonymFirst");
                        console.time("synonymSecond");
                        _context.next = 51;
                        return synonymSecond(word);

                    case 51:
                        willReturn.synonymSecond = _context.sent;

                        console.timeEnd("synonymSecond");
                        console.time("synonymThird");
                        _context.next = 56;
                        return synonymThird(word);

                    case 56:
                        willReturn.synonymThird = _context.sent;

                        console.timeEnd("synonymThird");
                        console.time("synonymFourth");
                        _context.next = 61;
                        return synonymFourth(word);

                    case 61:
                        willReturn.synonymFourth = _context.sent;

                        console.timeEnd("synonymFourth");
                        console.time("synonymFifth");
                        _context.next = 66;
                        return synonymFifth(word);

                    case 66:
                        willReturn.synonymFifth = _context.sent;

                        console.timeEnd("synonymFifth");
                        console.time("synonymSixth");
                        _context.next = 71;
                        return synonymSixth(word);

                    case 71:
                        willReturn.synonymSixth = _context.sent;

                        console.timeEnd("synonymSixth");
                        willReturn.synonymSeventh = local.related;
                        willReturn.word = word;

                        return _context.abrupt("return", willReturn);

                    case 76:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
    return function deEnTimerAsync(_x) {
        return ref.apply(this, arguments);
    };
}();

var deEnSaveAsync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(wordRaw) {
        var willReturn, word, local;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        willReturn = {};
                        word = wordRaw.trim().toLowerCase();

                        console.time("mixed");
                        _context2.next = 5;
                        return mixed(word);

                    case 5:
                        local = _context2.sent;

                        console.timeEnd("mixed");
                        willReturn.deEnFirst = local.translation;
                        console.time("deEnThird");
                        _context2.next = 11;
                        return deEnThird(word);

                    case 11:
                        willReturn.deEnThird = _context2.sent;

                        console.timeEnd("deEnThird");
                        console.time("phraseFirst");
                        _context2.next = 16;
                        return phraseFirst(word);

                    case 16:
                        willReturn.phraseFirst = _context2.sent;

                        console.timeEnd("phraseFirst");
                        console.time("phraseSecond");
                        _context2.next = 21;
                        return phraseSecond(word);

                    case 21:
                        willReturn.phraseSecond = _context2.sent;

                        console.timeEnd("phraseSecond");
                        console.time("phraseThird");
                        _context2.next = 26;
                        return phraseThird(word);

                    case 26:
                        willReturn.phraseThird = _context2.sent;

                        console.timeEnd("phraseThird");
                        console.time("phraseFourth");
                        _context2.next = 31;
                        return phraseFourth(word);

                    case 31:
                        willReturn.phraseFourth = _context2.sent;

                        console.timeEnd("phraseFourth");
                        console.time("phraseFifth");
                        _context2.next = 36;
                        return phraseFifth(word);

                    case 36:
                        willReturn.phraseFifth = _context2.sent;

                        console.timeEnd("phraseFifth");
                        console.time("phraseSixth");
                        _context2.next = 41;
                        return phraseSixth(word);

                    case 41:
                        willReturn.phraseSixth = _context2.sent;

                        console.timeEnd("phraseSixth");
                        console.time("synonymFirst");
                        _context2.next = 46;
                        return synonymFirst(word);

                    case 46:
                        willReturn.synonymFirst = _context2.sent;

                        console.timeEnd("synonymFirst");
                        console.time("synonymSecond");
                        _context2.next = 51;
                        return synonymSecond(word);

                    case 51:
                        willReturn.synonymSecond = _context2.sent;

                        console.timeEnd("synonymSecond");
                        console.time("synonymThird");
                        _context2.next = 56;
                        return synonymThird(word);

                    case 56:
                        willReturn.synonymThird = _context2.sent;

                        console.timeEnd("synonymThird");
                        console.time("synonymFourth");
                        _context2.next = 61;
                        return synonymFourth(word);

                    case 61:
                        willReturn.synonymFourth = _context2.sent;

                        console.timeEnd("synonymFourth");
                        console.time("synonymFifth");
                        _context2.next = 66;
                        return synonymFifth(word);

                    case 66:
                        willReturn.synonymFifth = _context2.sent;

                        console.timeEnd("synonymFifth");
                        console.time("synonymSixth");
                        _context2.next = 71;
                        return synonymSixth(word);

                    case 71:
                        willReturn.synonymSixth = _context2.sent;

                        console.timeEnd("synonymSixth");
                        willReturn.synonymSeventh = local.related;
                        //let willSave = scrapedParse.main(willReturn)
                        //willReturn.saved = await db.save("data", word, willSave)
                        return _context2.abrupt("return", willReturn);

                    case 75:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
    return function deEnSaveAsync(_x2) {
        return ref.apply(this, arguments);
    };
}();

var deEnAsync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(wordRaw) {
        var willReturn, word, local;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        willReturn = {};
                        word = wordRaw.trim().toLowerCase();
                        _context3.next = 4;
                        return mixed(word);

                    case 4:
                        local = _context3.sent;

                        willReturn.deEnFirst = local.translation;
                        _context3.next = 8;
                        return deEnThird(word);

                    case 8:
                        willReturn.deEnThird = _context3.sent;
                        _context3.next = 11;
                        return phraseFirst(word);

                    case 11:
                        willReturn.phraseFirst = _context3.sent;
                        _context3.next = 14;
                        return phraseSecond(word);

                    case 14:
                        willReturn.phraseSecond = _context3.sent;
                        _context3.next = 17;
                        return phraseThird(word);

                    case 17:
                        willReturn.phraseThird = _context3.sent;
                        _context3.next = 20;
                        return phraseFourth(word);

                    case 20:
                        willReturn.phraseFourth = _context3.sent;
                        _context3.next = 23;
                        return phraseFifth(word);

                    case 23:
                        willReturn.phraseFifth = _context3.sent;
                        _context3.next = 26;
                        return phraseSixth(word);

                    case 26:
                        willReturn.phraseSixth = _context3.sent;
                        _context3.next = 29;
                        return synonymFirst(word);

                    case 29:
                        willReturn.synonymFirst = _context3.sent;
                        _context3.next = 32;
                        return synonymSecond(word);

                    case 32:
                        willReturn.synonymSecond = _context3.sent;
                        _context3.next = 35;
                        return synonymThird(word);

                    case 35:
                        willReturn.synonymThird = _context3.sent;
                        _context3.next = 38;
                        return synonymFourth(word);

                    case 38:
                        willReturn.synonymFourth = _context3.sent;
                        _context3.next = 41;
                        return synonymFifth(word);

                    case 41:
                        willReturn.synonymFifth = _context3.sent;
                        _context3.next = 44;
                        return synonymSixth(word);

                    case 44:
                        willReturn.synonymSixth = _context3.sent;

                        willReturn.synonymSeventh = local.related;
                        willReturn.word = word;
                        return _context3.abrupt("return", willReturn);

                    case 48:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
    return function deEnAsync(_x3) {
        return ref.apply(this, arguments);
    };
}();

var deEnShortAsync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(wordRaw) {
        var willReturn, word, mixedResult;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        willReturn = {};
                        word = wordRaw.trim().toLowerCase();
                        _context4.next = 4;
                        return mixed(word);

                    case 4:
                        mixedResult = _context4.sent;

                        willReturn.deEnFirst = mixedResult.translation;
                        _context4.next = 8;
                        return synonymFirst(word);

                    case 8:
                        willReturn.synonymFirst = _context4.sent;
                        _context4.next = 11;
                        return synonymSecond(word);

                    case 11:
                        willReturn.synonymSecond = _context4.sent;

                        willReturn.synonymThird = mixedResult.related;
                        _context4.next = 15;
                        return synonymFourth(word);

                    case 15:
                        willReturn.synonymFourth = _context4.sent;
                        _context4.next = 18;
                        return synonymFifth(word);

                    case 18:
                        willReturn.synonymFifth = _context4.sent;
                        _context4.next = 21;
                        return phraseSecond(word);

                    case 21:
                        willReturn.phraseSecond = _context4.sent;
                        _context4.next = 24;
                        return phraseThird(word);

                    case 24:
                        willReturn.phraseThird = _context4.sent;
                        _context4.next = 27;
                        return phraseFourth(word);

                    case 27:
                        willReturn.phraseFourth = _context4.sent;
                        _context4.next = 30;
                        return phraseSixth(word);

                    case 30:
                        willReturn.phraseSixth = _context4.sent;
                        return _context4.abrupt("return", willReturn);

                    case 32:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
    return function deEnShortAsync(_x4) {
        return ref.apply(this, arguments);
    };
}();

var deEnArrAsync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(arr) {
        var willMap, willReturn;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        willMap = arr.map(function (val) {
                            return deEnSave(val);
                        });
                        _context5.next = 3;
                        return Promise.all(willMap);

                    case 3:
                        willReturn = _context5.sent;
                        return _context5.abrupt("return", willReturn);

                    case 5:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));
    return function deEnArrAsync(_x5) {
        return ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scrapeIt = require("scrape-it");
var cheerio = require("cheerio");
var fetch = require("node-fetch");
var request = require("request");
var db = require("proud-db");
var fs = require("fs-extra");
var J = require("justdo");
var R = require("ramda");
var scrapedParse = require("../../_inc/scrapedParse");
function save(name, data) {
    return new Promise(function (resolve) {
        fs.writeJson("/home/just/ils/_inc/words/" + name + ".json", { data: data }, function () {
            setTimeout(function () {
                resolve(true);
            }, 10000);
        });
    });
}
function deEnFirst(wordRaw) {
    var word = wordRaw.trim().toLowerCase();
    return new Promise(function (resolve) {
        willRequest("https://api.mymemory.translated.net/get?q=" + word + "&langpair=de|en").then(function (dataRaw) {
            var willReturnRaw = [];
            var willReturn = [];
            var data = JSON.parse(dataRaw);
            var mainTranslation = data.responseData.translatedText;
            resolve([{
                dePart: wordRaw,
                enPart: mainTranslation
            }]);
        }).catch(function (error) {
            console.error(error);
            resolve(null);
        });
    });
}
function deEnSecond(wordRaw) {
    var word = wordRaw.trim().toLowerCase();
    return new Promise(function (resolve) {
        fetch("http://dictionary.cambridge.org/dictionary/german-english/" + word).then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve(null);
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var $ = cheerio.load(data);
                    var selector = ".di-body";
                    var willReturn = [];
                    $(selector).each(function (i) {
                        var state = $(this).text().trim();
                        R.split(",", state).map(function (val) {
                            willReturn.push({
                                dePart: word,
                                enPart: val
                            });
                        });
                    });
                    resolve(willReturn);
                })();
            } else {
                resolve(null);
            }
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function deEnThird(wordRaw) {
    var word = wordRaw.trim().toLowerCase();
    return new Promise(function (resolve) {
        fetch("http://www.fremdwort.de/suchen/uebersetzung/" + word).then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve(null);
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var willReturn = [];
                    var $ = cheerio.load(data);
                    var selector = "#content .section ul li";
                    $(selector).each(function (i) {
                        var localWord = $(this).text().trim();
                        willReturn.push({
                            dePart: word,
                            enPart: localWord
                        });
                    });
                    resolve(willReturn);
                })();
            } else {
                resolve(null);
            }
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function synonymFirst(wordRaw) {
    var word = wordRaw.trim().toLowerCase();
    return new Promise(function (resolve) {
        fetch("http://ein.anderes-wort.de/fuer/" + word).then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve("response code error");
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var $ = cheerio.load(data);
                    var willReturn = [];
                    var selector = ".synonymeGroup";
                    $(selector).each(function (i) {
                        var localWord = $(this).text().trim();
                        localWord.substring(1).split("\n").map(function (val) {
                            if (val.trim() !== "") {
                                willReturn.push({
                                    dePart: val.trim(),
                                    enPart: ""
                                });
                            }
                        });
                    });
                    resolve(willReturn);
                })();
            } else {
                resolve(null);
            }
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function synonymSecond(wordRaw) {
    var word = wordRaw.trim().toLowerCase();
    return new Promise(function (resolve) {
        fetch("http://synonyme.woxikon.de/synonyme/" + word + ".php").then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve("response code error");
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var $ = cheerio.load(data);
                    var counter = 0;
                    var willReturn = [];
                    var selector = ".inner";
                    $(selector).each(function () {
                        var currentWord = $(this).text().trim();
                        if (counter == 0) {
                            (function () {
                                var arr = currentWord.split("\n");
                                arr.map(function (value, key) {
                                    var just = value.trim();
                                    var localWord = void 0;
                                    if (key == arr.length - 1) {
                                        localWord = just;
                                    } else {
                                        localWord = just.substring(0, just.length - 1);
                                    }
                                    if (localWord !== currentWord && localWord !== "") {
                                        willReturn.push({
                                            dePart: localWord,
                                            enPart: ""
                                        });
                                    }
                                });
                            })();
                        }
                        counter++;
                    });
                    resolve(willReturn);
                })();
            } else {
                resolve(null);
            }
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function synonymThird(wordRaw) {
    var word = wordRaw.trim().toLowerCase();
    return new Promise(function (resolve) {
        fetch("http://www.fremdwort.de/suchen/synonym/" + word).then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve(null);
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var willReturn = [];
                    var $ = cheerio.load(data);
                    var selector = "#content .section ul li";
                    $(selector).each(function (i) {
                        var localWord = $(this).text().trim();
                        willReturn.push({
                            dePart: localWord,
                            enPart: ""
                        });
                    });
                    resolve(willReturn);
                })();
            } else {
                resolve(null);
            }
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function synonymFourth(word) {
    return new Promise(function (resolve) {
        willRequest("https://www.openthesaurus.de/synonyme/search?q=" + word + "&format=application/json").then(function (dataRaw) {
            var data = JSON.parse(dataRaw);
            var willReturn = [];
            data.synsets.map(function (val) {
                willReturn = R.flatten([willReturn, R.pluck("term", val.terms)]);
            });
            resolve(R.compose(R.map(function (val) {
                return { dePart: val, enPart: "" };
            }), R.sort(function (a, b) {
                return b.length - a.length;
            }))(willReturn));
        });
    });
}
function synonymFifth(word) {
    return new Promise(function (resolve) {
        fetch("http://ein.anderes-wort.de/fuer/" + word).then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve(null);
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var $ = cheerio.load(data);
                    var willReturn = [];
                    var id = 0;
                    var flag = false;
                    var selector = "li a";
                    $(selector).each(function (i) {
                        var state = $(this).text().trim();
                        willReturn.push(state);
                    });
                    if (willReturn.length > 11) {
                        resolve(R.compose(R.map(function (val) {
                            return { dePart: val, enPart: "" };
                        }), R.filter(function (val) {
                            return val.length > 3;
                        }), R.sort(function (a, b) {
                            return b.length - a.length;
                        }), R.drop(2), R.dropLast(9))(willReturn));
                    } else {
                        resolve(null);
                    }
                })();
            } else {
                resolve(null);
            }
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function synonymSixth(word) {
    return new Promise(function (resolve) {
        fetch("http://ein-anderes-wort.com/ein_anderes_wort_fuer_" + word + ".html").then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve(null);
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var $ = cheerio.load(data);
                    var willReturn = [];
                    var id = 0;
                    var flag = false;
                    var selector = "a";
                    $(selector).each(function (i) {
                        var state = $(this).text().trim();
                        willReturn.push(state);
                    });
                    if (willReturn.length > 44) {
                        resolve(R.compose(R.map(function (val) {
                            return { dePart: val, enPart: "" };
                        }), R.filter(function (val) {
                            return R.indexOf("(", val) === -1 && R.indexOf(")", val) === -1 && val.length > 3;
                        }), R.sort(function (a, b) {
                            return b.length - a.length;
                        }), R.drop(10), R.dropLast(33))(willReturn));
                    } else {
                        resolve(null);
                    }
                })();
            } else {
                resolve(null);
            }
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function phraseFirst(wordRaw) {
    var word = wordRaw.trim().toLowerCase();
    return new Promise(function (resolve) {
        var url = "http://de.langenscheidt.com/deutsch-englisch/" + word;
        var flag = false;
        scrapeIt(url, {
            willReturn: {
                listItem: ".lemma-example",
                data: {
                    dePart: {
                        selector: ".col1 span span.text",
                        convert: function convert(state) {
                            flag = true;
                            return state.trim();
                        }
                    },
                    enPart: {
                        selector: ".trans-line span.trans",
                        convert: function convert(state) {
                            if (flag) {
                                flag = false;
                                return state.trim();
                            }
                        }
                    }
                }
            }
        }).then(function (incoming) {
            resolve(incoming.willReturn);
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function phraseSecond(wordRaw) {
    var word = wordRaw.trim().toLowerCase();
    return new Promise(function (resolve) {
        var url = "http://www.collinsdictionary.com/dictionary/german-english/" + word;
        scrapeIt(url, {
            data: {
                listItem: ".cit-type-example",
                data: {
                    dePart: {
                        selector: ".orth",
                        convert: function convert(wordIs) {
                            var localWord = R.replace("⇒", "", wordIs);
                            return localWord.trim();
                        }
                    },
                    enPart: {
                        selector: ".cit-type-translation",
                        convert: function convert(wordIs) {
                            return wordIs;
                        }
                    }
                }
            }
        }).then(function (data) {
            resolve(data.data);
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function phraseThird(wordRaw) {
    var word = wordRaw.trim().toLowerCase();
    return new Promise(function (resolve) {
        fetch("http://www.phrasen.com/index.php?do=suche&q=" + word).then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve(null);
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var willReturn = [];
                    var $ = cheerio.load(data);
                    var selector = "a.zeile";
                    $(selector).each(function (i) {
                        var localWord = $(this).text().trim();
                        willReturn.push({
                            dePart: localWord,
                            enPart: word
                        });
                    });
                    selector = "a.zeile1";
                    $(selector).each(function (i) {
                        var localWord = $(this).text().trim();
                        willReturn.push({
                            dePart: localWord,
                            enPart: ""
                        });
                    });
                    var sortByLength = R.sortBy(R.compose(function (a) {
                        return -a.length;
                    }, R.prop("dePart")));
                    var sortByLengthLess = R.sortBy(R.compose(function (a) {
                        return a.length;
                    }, R.prop("dePart")));
                    var local = R.take(20, sortByLength(willReturn));
                    var localSecond = R.take(10, sortByLengthLess(willReturn));
                    resolve(R.flatten([local, localSecond]));
                })();
            } else {
                resolve(null);
            }
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function phraseFourth(word) {
    return new Promise(function (resolve) {
        fetch("http://www.dict.cc/?s=" + word).then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve(null);
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var $ = cheerio.load(data);
                    var willReturn = [];
                    var selector = "tr";
                    var flagNumber = 0;
                    var enPart = void 0;
                    $(selector).each(function (i) {
                        var state = $(this).text().trim();
                        if (state.includes("Andere")) {
                            flagNumber = i - 4;
                        }
                    });
                    selector = "td.td7nl";
                    $(selector).each(function (i) {
                        var state = $(this).text().trim();
                        if (flagNumber <= i && i % 2 === 0) {
                            enPart = state;
                        }
                        if (flagNumber <= i && i % 2 === 1) {
                            willReturn.push({
                                dePart: state,
                                enPart: enPart
                            });
                        }
                    });
                    resolve(willReturn);
                })();
            } else {
                resolve(null);
            }
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function phraseFifth(word) {
    return new Promise(function (resolve) {
        fetch("http://zitate.net/zitate/suche.html?query=" + word).then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve(null);
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var $ = cheerio.load(data);
                    var willReturn = [];
                    var selector = "span.quote";
                    $(selector).each(function (i) {
                        var state = $(this).text().trim();
                        willReturn.push({
                            dePart: state,
                            enPart: ""
                        });
                    });

                    resolve(willReturn);
                })();
            } else {
                resolve(null);
            }
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function phraseSixth(word) {
    return new Promise(function (resolve) {
        fetch("http://www.uitmuntend.de/woerterbuch/" + word + "/").then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve(null);
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var $ = cheerio.load(data);
                    var willReturn = [];
                    var trimFn = R.compose(R.trim, R.head, R.split("["));
                    var filterFn = R.compose(R.uniq, R.filter(function (val) {
                        return val.length > 3 && val.length < 130;
                    }), R.map(function (val) {
                        return trimFn(val);
                    }));
                    var id = 0;
                    var flag = false;
                    var selector = "tr";
                    $(selector).each(function (i) {
                        var state = $(this).text().trim();
                        switch (state) {
                            case "Zusammensetzungen":
                            case "Sprichwörter & Zitate":
                            case "Beispiele":
                                flag = true;
                                break;
                            case "Title":
                                flag = false;
                                break;
                        }
                        if (flag) {
                            willReturn.push($(this).find("td[lang=\"de\"]").text().trim());
                        }
                    });
                    willReturn = R.sort(function (a, b) {
                        return a.length - b.length;
                    }, filterFn(willReturn));
                    resolve(R.map(function (val) {
                        return { dePart: val, enPart: "" };
                    }, willReturn));
                })();
            } else {
                resolve(null);
            }
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}
function mixed(wordRaw) {
    var word = wordRaw.trim().toLowerCase();
    return new Promise(function (resolve) {
        var url = "https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=de&tl=en&q=" + word;
        willRequest(url).then(function (dataRaw) {
            var data = JSON.parse(dataRaw);
            var willReturn = {};
            var willReturnTranslation = [];
            var willReturnRelated = [];
            if (R.prop("dict", data) && R.prop("dict", data).length > 0) {
                var state = R.prop("dict", data)[0];
                if (R.prop("terms", state)) {
                    var local = R.prop("terms", state);
                    local.map(function (localState) {
                        willReturnTranslation.push({
                            dePart: word,
                            enPart: localState
                        });
                    });
                }
                if (R.prop("entry", state)) {
                    var _local = R.prop("entry", state);
                    _local.map(function (val) {
                        val.reverse_translation.map(function (value) {
                            willReturnRelated.push({
                                dePart: value,
                                enPart: val.word
                            });
                        });
                    });
                }
            }
            willReturn.translation = willReturnTranslation;
            willReturn.related = willReturnRelated;
            resolve(willReturn);
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}

function deEn(word) {
    return deEnAsync(word);
}
function deEnShort(word) {
    return deEnShortAsync(word);
}
function deEnSave(word) {
    return new Promise(function (resolve) {
        deEnSaveAsync(word).then(function (incoming) {
            resolve(incoming);
        });
    });
}
function deEnArr(arr) {
    return new Promise(function (resolve) {
        deEnArrAsync(arr).then(function (incoming) {
            resolve(incoming);
        });
    });
}
function deEnTimer(word) {
    return new Promise(function (resolve) {
        deEnTimerAsync(word).then(function (incoming) {
            resolve(incoming);
        });
    });
}
function willRequest(url) {
    return new Promise(function (resolve, reject) {
        request({
            url: url,
            "rejectUnauthorized": false
        }, function (error, response, body) {
            if (response.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}
module.exports.deEn = deEn;
module.exports.deEnShort = deEnShort;
module.exports.deEnTimer = deEnTimer;
module.exports.deEnSave = deEnSave;
module.exports.deEnArr = deEnArr;
module.exports.deEnFirst = deEnFirst;
module.exports.deEnSecond = deEnSecond;
module.exports.deEnThird = deEnThird;
module.exports.mixed = mixed;
module.exports.synonymFirst = synonymFirst;
module.exports.synonymSecond = synonymSecond;
module.exports.synonymThird = synonymThird;
module.exports.synonymFourth = synonymFourth;
module.exports.synonymFifth = synonymFifth;
module.exports.synonymSixth = synonymSixth;
module.exports.phraseFirst = phraseFirst;
module.exports.phraseSecond = phraseSecond;
module.exports.phraseThird = phraseThird;
module.exports.phraseFourth = phraseFourth;
module.exports.phraseFifth = phraseFifth;
module.exports.phraseSixth = phraseSixth;
