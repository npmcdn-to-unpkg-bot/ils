var express         = require('express');
var router          = express.Router();
var queryWord;
var events          = require('events');
var eventEmitter    = new events.EventEmitter();
var common          = require('../inc/common.js')
var bing            = require('../inc/streams/bing.js');
var gutenberg       = require('../inc/streams/gutenberg.js');
var proxyNeedle     = require('../inc/streams/proxyNeedle.js');
var reference       = require('../inc/streams/reference.js');
var google          = require('../inc/streams/googleSearch.js');
var googleTranslate = require('../inc/streams/googleTranslate.js');
var electron        = require('../inc/streams/electron.js');
var detoen          = require('../inc/streams/detoen.js');
var yandex          = require('../inc/streams/yandex.js');
var mymemory        = require('../inc/streams/mymemory')
var synonyms        = require('../inc/streams/synonyms.js');
var enSynonyms      = require('../inc/streams/enSynonyms.js');
var entode          = require('../inc/streams/entode.js');
var quotes          = require('../inc/streams/quotes.js');
var deMain          = require('../inc/de/main.js');
var reverso         = require('../inc/streams/reverso.js');
var http            = require('http'),
    fs              = require('fs');
var async           = require('async');
var Firebase        = require('firebase');
var reqwest        = require('reqwest');
var socket_server = http.createServer(function (req, res) {});

var io = require('socket.io').listen(socket_server);
io.sockets.on('disconnect', function () {
	io.sockets.disconnect();
	io.sockets.close();
});
socket_server.listen(3100);

function getting(url, callback) {
	reqwest({
		url:     url,
		method:  'get',
		success: function (resp) {
			callback(resp)
		}
	})
}

router.get('/chromeConnection/:word', function (req, res) {
	var query = req.param('word');
	deMain.all(query, function (err, data) {
		res.send(JSON.stringify(data))
		getting(`http://localhost:3003/control/log/${JSON.stringify(data)}/lazy`, function(){
		})
		getting(`http://localhost:3003/control/deamon/googleTranslate/${query}`, function(){
		})
	})
})

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
// two fields for google and notGoogle streams
// nonGoogle will use the new pattern with натрупвания на queries
// or both wait for 10 words in the queue
var inProgress = require('../inc/streams/inProgress')

function getSingleImage(inputArr, cb) {
	var willSend = []
	console.log(inputArr)
	async.mapLimit(inputArr, 1,
		function (word, callback) {
			console.log(word)
			willSend.push(word)
			bing.singleImage(word, function (err, data) {
				if (err) {
					callback(null, 'https://placeholdit.imgix.net/~text?txtsize=5&txt=30%C3%9730&w=30&h=30')
				} else {
					willSend.push(data)
					callback(null, data)
				}
			})
		}
		,
		function (errorArr, dataArr) {
			var dbRef          = new Firebase('https://boiling-heat-3122.firebaseio.com/');
			var finalObj = {}
			finalObj['images'] = {'data': JSON.stringify(dataArr)};
			dbRef.update(finalObj)
			cb(JSON.stringify(willSend))
		})
}

router.post('/electronLeo', function (req, res) {
	var query = req.body.query;
	electron.leoTranslate(query, function (err, data) {
		if (err) {
			setTimeout(function () {
				res.send(JSON.stringify(err))
			}, 1000)
		} else {
			setTimeout(function () {
				res.send('done')
			}, 1000)
		}
	})
});

router.post('/leoTranslate', function (req, res) {
	var query = req.body.query;
	googleTranslate.leoTranslate(query.split(','), function (err, data) {
		if (err) {
			setTimeout(function () {
				res.send(JSON.stringify(data))
			}, 1000)
		} else {
			setTimeout(function () {
				getSingleImage(query.split(','), function (justData) {
					res.send(JSON.stringify(justData) + '\n' + JSON.stringify(data))
				})
			}, 1000)
		}
	})
});

router.post('/googlePlural', function (req, res) {
	var query = req.body.query;
	queryWord = query;
	googleTranslate.getNoun(query, function (err, data) {
		if (err) {
			setTimeout(function () {
				res.send(JSON.stringify(data))
			}, 1000)
		} else {
			setTimeout(function () {
				res.send(JSON.stringify(data))
			}, 1000)
		}
	})
});

router.post('/chromeTranslate', function (req, res) {
	var query = req.body.query;
	mymemory.entode(query, function (err, data) {
		if (err) {
			res.send(JSON.stringify(data))
		} else {
			res.send(JSON.stringify(data))
		}
	})
});

router.post('/chromeTranslateDe', function (req, res) {
	var query = req.body.query;
	mymemory.detoen(query, function (err, data) {
		if (err) {
			res.send(JSON.stringify(data))
		} else {
			res.send(JSON.stringify(data))
		}
	})
});

router.post('/chromeImage', function (req, res) {
	var query = req.body.query;
	bing.image(query, function (err, data) {
		if (err) {
			res.send(JSON.stringify(data))
		} else {
			res.send(JSON.stringify(data))
		}
	})
});

function patternWithMethod(commandWord, commandMethod, callback) {
	router.post('/' + commandWord, function (req, res) {
		var query = req.body.query;
		queryWord = query;
		commandMethod(query.trim(), function (err, data) {
			if (err) {
				callback(commandWord, err, null)
				setTimeout(function () {
					console.log('sending')
					res.send('done')
				}, 1000)
			} else {
				callback(commandWord, null, data)
				setTimeout(function () {
					console.log('sending')
					res.send('done')
				}, 1000)
			}
		})
	});
}

function patternJustCall(commandWord, commandMethod, query, callback) {
	commandMethod(query.trim(), function (err, data) {
		if (err) {
			callback(commandWord, err, null)
		} else {
			callback(commandWord, null, data)
		}
	})
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

patternWithMethod('learningMeme', gutenberg.get, function (commandWord, error, data) {
	if (error) {
		io.sockets.emit('socketError', error);
	} else {
		io.sockets.emit(commandWord, data);
		eventEmitter.emit('firstStep')
	}
})

patternWithMethod('guessThePhrase', gutenberg.get, function (commandWord, error, data) {
	if (error) {
		io.sockets.emit('socketError', error);
	} else {
		io.sockets.emit(commandWord, data);
		eventEmitter.emit('firstStep')
	}
})

eventEmitter.on('firstStep', function () {
	patternJustCall('welt', google.weltExact, queryWord, function (commandWord, error, data) {
		if (error) {
			io.sockets.emit('socketError', error);
		} else {
			io.sockets.emit(commandWord, data);
			eventEmitter.emit('secondStep')
		}
	})
})

eventEmitter.on('secondStep', function () {
	patternJustCall('reversoDetoen', reverso.detoenSecondSocket, queryWord, function (commandWord, error, data) {
		if (error) {
			io.sockets.emit('socketError', error);
		} else {
			io.sockets.emit(commandWord, data);
			//eventEmitter.emit('thirdStep')
		}
	})
})

patternWithMethod('withSeparation', gutenberg.getAlternative, function (commandWord, error, data) {
	if (error) {
		io.sockets.emit('socketError', error);
	} else {
		io.sockets.emit(commandWord, data);
		eventEmitter.emit('firstStepWithSeparation')
	}
})

eventEmitter.on('firstStepWithSeparation', function () {
	patternJustCall('withSeparationStepTwo', proxyNeedle.getWithSeparation, queryWord, function (commandWord, error, data) {
		if (error) {
			io.sockets.emit('socketError', error);
		} else {
			io.sockets.emit(commandWord, data);
		}
	})
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
		console.log(data.length)
		data.map(function (value) {
			var ss1 = value.replace(/RT @[A-Za-z0-9_:\s]+/g, '');
			var ss2 = ss1.replace(/http[s]{0,1}:\/\/[A-Za-z\/.0-9-#]{1,28}/g, '');
			var ss3 = ss2.replace(/@[A-Za-z0-9_]+/g, '');
			var ss4 = ss3.replace(/\n/g, '');
			var ss5 = ss4.replace(/#[a-zöüßäA-Z]+/g, '');
			var ss6 = ss4.replace(/[^a-zöüßäA-Z.,\-()\s]/g, '');
			willSend.push(ss6)
		})
		var medSend   = filteringTwitter(willSend)
		var finalSend = reasonFn(medSend)
		console.log(finalSend)
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

patternWithMethod('detoen', mymemory.detoen, function (commandWord, error, data) {
	if (error) {
		io.sockets.emit('socketError', error);
	} else {
		io.sockets.emit(commandWord, data);
	}
})

patternWithMethod('detoenAlt', mymemory.detoen, function (commandWord, error, data) {
	if (error) {
		io.sockets.emit('socketError', error);
	} else {
		io.sockets.emit(commandWord, data);
		patternJustCall('detoenAltSecond', quotes.getSecond, queryWord, function (commandWord, error, data) {
			if (error) {
				io.sockets.emit('socketError', error);
			} else {
				io.sockets.emit(commandWord, data);
			}
		})
	}
})
patternWithMethod('detoenCollection', mymemory.detoenCollection, function (commandWord, error, data) {
	if (error) {
		io.sockets.emit('socketError', error);
	} else {
		io.sockets.emit(commandWord, data);
	}
})

patternWithMethod('entodeSecond', mymemory.entode, function (commandWord, error, data) {
	if (error) {
		io.sockets.emit('socketError', error);
	} else {
		io.sockets.emit(commandWord, data);
	}
})

patternWithMethod('quotes', quotes.get, function (commandWord, error, data) {
	if (error) {
		io.sockets.emit('socketError', error);
	} else {
		io.sockets.emit(commandWord, data);
		patternJustCall('quotesSecond', quotes.getSecond, queryWord, function (commandWord, error, data) {
			if (error) {
				io.sockets.emit('socketError', error);
			} else {
				console.log('will emit')
				io.sockets.emit(commandWord, data);
			}
		})
	}
})

router.post('/singleProcessPlural', function (req, res) {
	var query = req.body.query;
	console.log(query)
	enSynonyms.getAlternative(query, function (err, data) {
		async.map(data, function (singleElement, callback) {
			mymemory.entode(singleElement.trim(), function (errorSecond, singleResult) {
				if (errorSecond) {
					console.error(errorSecond)
				}
				callback(null, singleResult)
			})
		}, function (errThird, results) {
			if (errThird) {
				console.log(errThird);
				setTimeout(function () {
					res.send('done')
				}, 1000)
			} else {
				var firstArray = []
				results.map(function (value, key) {
					if (key % 2 == 0) {
						if (results[key + 1] !== 'empty' && value !== undefined) {
							var just = getDistance(value.toLowerCase(), results[key + 1].toLowerCase())
							if (just < 5 && just !== 0) {
								firstArray.push(data[key] + ' - ' + firstWordLowercase(value) + '|' + data[key + 1] + ' - ' + firstWordLowercase(results[key + 1]))

							}
						}
					}
				})
				io.sockets.emit('singleProcessPlural', firstArray);
				setTimeout(function () {
					res.send('done')
				}, 1000)
			}
		})
	})
})

router.post('/entodeAlternative', function (req, res) {
	var query = req.body.query;
	enSynonyms.get(query, function (err, data) {
		data = common.splicePrepend(12, query, data)
		async.map(data, function (singleElement, callback) {
			mymemory.entode(singleElement.trim(), function (errorSecond, singleResult) {
				console.log(singleResult)
				if (errorSecond) {
					console.error(errorSecond)
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
				var firstArray  = []
				var secondArray = []
				results.map(function (value, key) {
					if (value !== null) {
						firstArray.push(value)
						secondArray.push(data[key])
					}
				})
				io.sockets.emit('entodeAlternative', [firstArray, secondArray]);
				googleTranslate.get(query, function (errAlternative, data) {
					console.log(data)
					if (errAlternative) {
						io.sockets.emit('socketError', errAlternative);
					} else {
						io.sockets.emit('entodeAlternativeSecond', data);
						setTimeout(function () {
							res.send('done')
						}, 1000)
					}
				})
			}
		})
	})
})

patternMain('verbix', function (commandWord, error, data) {
	if (error) {
		io.sockets.emit('socketError', error);
	} else {
		console.log(data)
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
		data = common.splicePrepend(12, query, data)
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
				var firstArray  = []
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
	synonyms.yandexEntode(query, function (err, data) {
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
	var ss1     = inputString.trim().split(' ');
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
		if (value.toLowerCase().indexOf(queryWord) !== -1) {
			willReturn.push(value)
		}
	})
	return willReturn
}

function filteringTwitter(arr) {
	var willReturn = []
	arr.map(function (value) {
		if (countCapital(value) < 8 && value.length > 49) {
			willReturn.push(value)
		}
	})
	return willReturn;
}

module.exports = router;

function getDistance(a, b) {
	if (a.length == 0) return b.length;
	if (b.length == 0) return a.length;

	var matrix = [];

	var i;
	for (i = 0; i <= b.length; i++) {
		matrix[i] = [i];
	}

	var j;
	for (j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
	}

	for (i = 1; i <= b.length; i++) {
		for (j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) == a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
					Math.min(matrix[i][j - 1] + 1, // insertion
						matrix[i - 1][j] + 1)); // deletion
			}
		}
	}

	return matrix[b.length][a.length];
}

function firstWordLowercase(word) {
	return word.split(' ')[0].toLowerCase() + ' ' + word.split(' ')[1][0].toUpperCase() + word.split(' ')[1].substring(1).toLowerCase()
}