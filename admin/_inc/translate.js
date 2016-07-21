"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var deEnAsync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(wordRaw) {
        var word, local;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        word = wordRaw.trim().toLowerCase();
                        _context.next = 3;
                        return mixed(word);

                    case 3:
                        local = _context.sent;
                        _context.next = 6;
                        return deEnThird(word);

                    case 6:
                        willReturnMain.deEnThird = _context.sent;

                        willReturnMain.deEnFourth = local.translation;
                        _context.next = 10;
                        return phraseFirst(word);

                    case 10:
                        willReturnMain.phraseFirst = _context.sent;
                        _context.next = 13;
                        return phraseSecond(word);

                    case 13:
                        willReturnMain.phraseSecond = _context.sent;
                        _context.next = 16;
                        return phraseThird(word);

                    case 16:
                        willReturnMain.phraseThird = _context.sent;
                        _context.next = 19;
                        return phraseFourth(word);

                    case 19:
                        willReturnMain.phraseFourth = _context.sent;
                        _context.next = 22;
                        return phraseFifth(word);

                    case 22:
                        willReturnMain.phraseFifth = _context.sent;
                        _context.next = 25;
                        return phraseSixth(word);

                    case 25:
                        willReturnMain.phraseSixth = _context.sent;
                        _context.next = 28;
                        return phraseSeventh(word);

                    case 28:
                        willReturnMain.phraseSeventh = _context.sent;
                        _context.next = 31;
                        return synonymFirst(word);

                    case 31:
                        willReturnMain.synonymFirst = _context.sent;
                        _context.next = 34;
                        return synonymSecond(word);

                    case 34:
                        willReturnMain.synonymSecond = _context.sent;
                        _context.next = 37;
                        return synonymThird(word);

                    case 37:
                        willReturnMain.synonymThird = _context.sent;

                        willReturnMain.synonymFourth = local.related;
                        return _context.abrupt("return", willReturnMain);

                    case 40:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
    return function deEnAsync(_x) {
        return ref.apply(this, arguments);
    };
}();

var deEnAltAsync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(wordRaw) {
        var word, local;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        word = wordRaw.trim().toLowerCase();
                        _context2.next = 3;
                        return mixed(word);

                    case 3:
                        local = _context2.sent;
                        _context2.next = 6;
                        return deEnThird(word);

                    case 6:
                        willReturnMain.deEnThird = _context2.sent;

                        willReturnMain.deEnFourth = local.translation;
                        _context2.next = 10;
                        return phraseFirst(word);

                    case 10:
                        willReturnMain.phraseFirst = _context2.sent;
                        _context2.next = 13;
                        return phraseSecond(word);

                    case 13:
                        willReturnMain.phraseSecond = _context2.sent;
                        _context2.next = 16;
                        return phraseThird(word);

                    case 16:
                        willReturnMain.phraseThird = _context2.sent;
                        _context2.next = 19;
                        return phraseFourth(word);

                    case 19:
                        willReturnMain.phraseFourth = _context2.sent;
                        _context2.next = 22;
                        return phraseFifth(word);

                    case 22:
                        willReturnMain.phraseFifth = _context2.sent;
                        _context2.next = 25;
                        return phraseSixth(word);

                    case 25:
                        willReturnMain.phraseSixth = _context2.sent;
                        _context2.next = 28;
                        return phraseSeventh(word);

                    case 28:
                        willReturnMain.phraseSeventh = _context2.sent;
                        _context2.next = 31;
                        return synonymFirst(word);

                    case 31:
                        willReturnMain.synonymFirst = _context2.sent;
                        _context2.next = 34;
                        return synonymSecond(word);

                    case 34:
                        willReturnMain.synonymSecond = _context2.sent;
                        _context2.next = 37;
                        return synonymThird(word);

                    case 37:
                        willReturnMain.synonymThird = _context2.sent;

                        willReturnMain.synonymFourth = local.related;
                        return _context2.abrupt("return", willReturnMain);

                    case 40:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
    return function deEnAltAsync(_x2) {
        return ref.apply(this, arguments);
    };
}();

var deEnShortAsync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(wordRaw) {
        var word, local;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        word = wordRaw.trim().toLowerCase();
                        _context3.next = 3;
                        return mixed(word);

                    case 3:
                        local = _context3.sent;

                        willReturnMain.deEnFourth = local.translation;
                        //willReturnMain.synonymFirst = await synonymFirst(word)
                        willReturnMain.synonymFourth = local.related;
                        //willReturnMain.phraseFirst = await phraseFirst(word)
                        _context3.next = 8;
                        return phraseFourth(word);

                    case 8:
                        willReturnMain.phraseFourth = _context3.sent;
                        _context3.next = 11;
                        return phraseSixth(word);

                    case 11:
                        willReturnMain.phraseSixth = _context3.sent;
                        return _context3.abrupt("return", willReturnMain);

                    case 13:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
    return function deEnShortAsync(_x3) {
        return ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scrapeIt = require("scrape-it");
var cheerio = require("cheerio");
var fetch = require("node-fetch");
var request = require("request");
var J = require("justdo");
var R = require("ramda");

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

function enDeFirst(wordRaw) {
    var word = wordRaw.trim().toLowerCase();
    return new Promise(function (resolve) {
        willRequest("https://api.mymemory.translated.net/get?q=" + word + "&langpair=en|de").then(function (dataRaw) {
            var willReturnRaw = [];
            var willReturn = [];
            var data = JSON.parse(dataRaw);
            var mainTranslation = data.responseData.translatedText;
            resolve({
                dePart: mainTranslation,
                enPart: wordRaw
            });
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
                                    enPart: word
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
                                            enPart: word
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
                            enPart: word
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
//
function phraseFirst(wordRaw) {
    var word = wordRaw.trim().toLowerCase();
    return new Promise(function (resolve) {
        var flag = false;
        var willReturn = [];
        var dePart = void 0;
        var url = "http://de.langenscheidt.com/deutsch-englisch/" + word;
        scrapeIt(url, {
            examples: {
                listItem: ".row-fluid",
                data: {
                    dePart: {
                        selector: ".lkgEx",
                        convert: function convert(wordIs) {
                            if (wordIs.length > 0 && wordIs.length < 70) {
                                flag = true;
                                dePart = wordIs;
                            } else {
                                flag = false;
                            }
                        }
                    },
                    enPart: {
                        selector: ".lkgExNormal",
                        convert: function convert(wordIs) {
                            if (flag && wordIs.length > 0 && wordIs.length < 70) {
                                var just = {};
                                just.dePart = dePart;
                                just.enPart = wordIs;
                                willReturn.push(just);
                            }
                        }
                    }
                }
            }
        }).then(function () {
            resolve(willReturn);
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
                            enPart: word
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
                            J.lg(state, "flag");
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
//
function phraseFifth(word) {
    return new Promise(function (resolve) {
        fetch("http://www.duden.de/rechtschreibung/" + word).then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve(null);
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var filterFn = R.compose(R.trim, R.join(" "), R.split(" "), R.ifElse(function (data) {
                        R.length(data) === 1;
                    }, R.always, R.last), R.split(">:"));
                    var $ = cheerio.load(data);
                    var willReturn = [];
                    var selector = "#Bedeutung1 .term-section ul li";
                    $(selector).each(function (i) {
                        var state = $(this).text().trim();
                        willReturn.push({
                            dePart: filterFn(state),
                            enPart: word
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
                            enPart: word
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
function phraseSeventh(word) {
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

var willReturnMain = {};

function deEn(word) {
    var ms = arguments.length <= 1 || arguments[1] === undefined ? 12000 : arguments[1];

    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(willReturnMain);
        }, ms);
        deEnAsync(word).then(function (incoming) {
            resolve(incoming);
        });
    });
}
function deEnShort(word) {
    var ms = arguments.length <= 1 || arguments[1] === undefined ? 10000 : arguments[1];

    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(willReturnMain);
        }, ms);
        deEnAsync(word).then(function (result) {
            resolve(result);
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
module.exports.deEnFirst = deEnFirst;
module.exports.deEnSecond = deEnSecond;
module.exports.deEnThird = deEnThird;
module.exports.mixed = mixed;
module.exports.synonymFirst = synonymFirst;
module.exports.synonymSecond = synonymSecond;
module.exports.synonymThird = synonymThird;
module.exports.phraseFirst = phraseFirst;
module.exports.phraseSecond = phraseSecond;
module.exports.phraseThird = phraseThird;
module.exports.phraseFourth = phraseFourth;
module.exports.phraseFifth = phraseFifth;
module.exports.phraseSixth = phraseSixth;
module.exports.phraseSeventh = phraseSeventh;
