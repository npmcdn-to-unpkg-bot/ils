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

                        willReturnMain.deEnFourth = local.translation;
                        _context.next = 7;
                        return synonymFirst(word);

                    case 7:
                        willReturnMain.synonymFirst = _context.sent;

                        willReturnMain.synonymFourth = local.related;
                        _context.next = 11;
                        return phraseFirst(word);

                    case 11:
                        willReturnMain.phraseFirst = _context.sent;
                        _context.next = 14;
                        return phraseSecond(word);

                    case 14:
                        willReturnMain.phraseSecond = _context.sent;
                        _context.next = 17;
                        return phraseThird(word);

                    case 17:
                        willReturnMain.phraseThird = _context.sent;
                        _context.next = 20;
                        return synonymSecond(word);

                    case 20:
                        willReturn.synonymSecond = _context.sent;
                        _context.next = 23;
                        return synonymThird(word);

                    case 23:
                        willReturnMain.synonymThird = _context.sent;
                        return _context.abrupt("return", willReturnMain);

                    case 25:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
    return function deEnAsync(_x2) {
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

function timeoutFn() {
    var ms = arguments.length <= 0 || arguments[0] === undefined ? 5000 : arguments[0];

    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve([]);
        }, ms);
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

module.exports.timeoutFn = timeoutFn;
module.exports.deEnFirst = deEnFirst;
module.exports.deEnSecond = deEnSecond;
module.exports.deEnThird = deEnThird;
module.exports.mixed = mixed;
module.exports.synonymFirst = synonymFirst;
module.exports.synonymSecond = synonymSecond;
module.exports.synonymThird = synonymThird;
module.exports.phraseFirst = phraseFirst;
module.exports.phraseSecond = phraseSecond;
