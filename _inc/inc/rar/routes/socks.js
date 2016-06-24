var express = require('express');
var router = express.Router();
var queryWord;
var common = require('../inc/common.js')
var bing = require('../inc/streams/bing.js');
var reference = require('../inc/streams/reference.js');
var google = require('../inc/streams/googleSearch.js');
var googleTranslate = require('../inc/streams/googleTranslate.js');
var detoen = require('../inc/streams/detoen.js');
var yandex = require('../inc/streams/yandex.js');

var synonyms = require('../inc/streams/synonyms.js');
var enSynonyms = require('../inc/streams/enSynonyms.js');
var entode = require('../inc/streams/entode.js');

var reverso = require('../inc/streams/reverso.js');
var http = require('http'),
    fs = require('fs');
var async = require('async');
var socket_server = http.createServer(function (req, res) {
});

var io = require('socket.io').listen(socket_server);
io.sockets.on('disconnect', function () {
    io.sockets.disconnect();
    io.sockets.close();
});
socket_server.listen(3100);
// PATTERN FUNCTIONS
function patternMain(commandWord, callback) {
    var wasRequired = require('../inc/streams/' + commandWord)
    router.post('/' + commandWord, function (req, res) {
        var query = req.body.query;
        queryWord = query;
        wasRequired.get(query.trim(), function (err, data) {
            if (err) {
                callback(commandWord, err, null)
                setTimeout(function () {
                    res.send('done')
                }, 1000)
            } else {
                callback(commandWord, null, data)
                setTimeout(function () {
                    res.send('done')
                }, 1000)
            }
        })
    });
}

function patternWithMethod(commandWord, commandMethod, callback) {
    router.post('/' + commandWord, function (req, res) {
        var query = req.body.query;
        queryWord = query;
        commandMethod(query.trim(), function (err, data) {
            if (err) {
                callback(commandWord, err, null)
                setTimeout(function () {
                    res.send('done')
                }, 1000)
            } else {
                callback(commandWord, null, data)
                setTimeout(function () {
                    res.send('done')
                }, 1000)
            }
        })
    });
}

patternMain('examples', function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        io.sockets.emit(commandWord, data);
    }
})

patternWithMethod('bingImages', bing.image, function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        io.sockets.emit(commandWord, data);
    }
})

patternWithMethod('yandexReferenceEnToDe', reference.yandexReferenceEnToDe, function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        io.sockets.emit(commandWord, data);
    }
})

patternWithMethod('related', yandex.get, function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        io.sockets.emit(commandWord, data);
    }
})

patternWithMethod('yandexReferenceDeToEn', reference.yandexReferenceDeToEn, function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        io.sockets.emit(commandWord, data);
    }
})

patternWithMethod('context', bing.context, function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        var willSend = [];
        data.map(function (value) {
            if (value.length > 140) {
                willSend.push(value.substring(0, 140))
            }
        })
        io.sockets.emit(commandWord, willSend);
    }
})

patternMain('twitter', function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        var willSend = [];
        data.map(function (value) {
            var ss1 = value.replace(/RT @[A-Za-z0-9_:\s]+/g, '');
            var ss2 = ss1.replace(/http[s]{0,1}:\/\/[A-Za-z\/.0-9-#]{1,28}/g, '');
            var ss3 = ss2.replace(/@[A-Za-z0-9_]+/g, '');
            var ss4 = ss3.replace(/\n/g, '');
            var ss5 = ss4.replace(/[^a-zöüßäA-Z.,\-()\s]/g, '');
            willSend.push(ss5)
        })
        var medSend = filteringTwitter(willSend)
        var finalSend = reasonFn(medSend)
        io.sockets.emit(commandWord, finalSend);
    }
})

patternWithMethod('welt', google.welt, function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        io.sockets.emit(commandWord, data);
    }
})

patternWithMethod('googleExactSearch', google.exactSearch, function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        io.sockets.emit(commandWord, data);
    }
})

patternWithMethod('detoen', detoen.getBetter, function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        io.sockets.emit(commandWord, data);
    }
})

patternMain('verbix', function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        io.sockets.emit(commandWord, data);
    }
})

patternWithMethod('reversoDetoen', reverso.detoenSecond, function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        io.sockets.emit(commandWord, data);
    }
})

patternWithMethod('reversoDetoenSecond', reverso.detoenSecond, function (commandWord, error, data) {
    if (error) {
        io.sockets.emit('socketError', error);
    } else {
        io.sockets.emit(commandWord, data);
    }
})

router.post('/googleTranslate', function (req, res) {
    var query = req.body.query;

    googleTranslate.get(query.trim(), function (data) {
        io.sockets.emit('googleTranslate', data);
        setTimeout(function () {
            res.send('done')
        }, 1000)
    })
    entode.getOpposite(query.trim(), function (err, word) {
        reverso.detoen(word, function (err, data) {
            io.sockets.emit('reversoDetoen', data);
        })
    })
})

router.post('/entode', function (req, res) {
    var query = req.body.query;
    enSynonyms.get(query, function (err, data) {
        data = common.splicePrepend(12,query,data)
        async.map(data, function (singleElement, callback) {
            entode.get(singleElement.trim(), function (singleResult) {
                if (err) {
                    console.error(err)
                }
                if (singleElement.trim() == singleResult.trim()) {
                    callback(null, null)
                } else {
                    callback(null, singleResult)
                }
            })
        }, function (err, results) {
            if (err) {
                console.log(err);
                setTimeout(function () {
                    res.send('done')
                }, 1000)
            } else {
                var firstArray = []
                var secondArray = []
                results.map(function (value, key) {
                    if (value !== null) {
                        firstArray.push(value)
                        secondArray.push(data[key])
                    }
                })
                io.sockets.emit('entode', [firstArray, secondArray]);
                setTimeout(function () {
                    res.send('done')
                }, 1000)
            }
        });
    })
});

router.post('/synonyms', function (req, res) {
    var query = req.body.query;
    synonyms.getBetter(query, function (error, data) {
        if (error) {
            io.sockets.emit('socketError', error);
            setTimeout(function () {
                res.send('done')
            }, 1000)
        } else {
            var wordArray = data.split(' · ')
            async.map(wordArray, function (singleElement, callback) {
                detoen.getBetter(singleElement.trim(), function (singleError, singleResult) {
                    callback(singleError, singleResult)
                })
            }, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    io.sockets.emit('synonyms', [wordArray, results]);
                    setTimeout(function () {
                        res.send('done')
                    }, 1000)
                }
            })
        }
    })
});

router.post('/synonymsPlus', function (req, res) {
    var query = req.body.query;
    synonyms.yandexEntode(query, function (err,data) {
        async.map(data, function (singleElement, callback) {
            detoen.getBetter(singleElement, function (singleError, singleResult) {
                callback(singleError, singleResult)
            })
        }, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                io.sockets.emit('synonymsPlus', [data, results]);
                setTimeout(function () {
                    res.send('done')
                }, 1000)
            }
        })
    })
})
//COMMON
function countCapital(inputString) {
    var ss1 = inputString.trim().split(' ');
    var counter = 0
    ss1.map(function (value) {
        if (value.length > 1) {
            var ss2 = value.charCodeAt(0);
            var ss3 = value.charCodeAt(1);
            if (ss2 > 64 && ss2 < 91 && ss3 > 64 && ss3 < 91) {
                counter++
            }

        }
    })
    return counter
}

function reasonFn(data) {
    var willReturn = []
    data.map(function (value) {
        if (value.indexOf(queryWord) !== -1) {
            willReturn.push(value)
        }
    })
    return willReturn
}

function filteringTwitter(arr) {
    var willReturn = []
    arr.map(function (value) {
        if (countCapital(value) == 0 && value.length > 49) {
            willReturn.push(value)
        } else {
            console.log(value)
        }
    })
    return willReturn;
}

module.exports = router;