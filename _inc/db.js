"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var random = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var modelName = arguments.length <= 0 || arguments[0] === undefined ? "Main" : arguments[0];
        var willReturn, rand;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        willReturn = {};
                        _context.next = 3;
                        return count(modelName);

                    case 3:
                        willReturn.count = _context.sent;
                        rand = Math.floor(Math.random() * willReturn.count);
                        _context.next = 7;
                        return findOneSkip(modelName, rand);

                    case 7:
                        willReturn.main = _context.sent;
                        return _context.abrupt("return", willReturn.main);

                    case 9:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function random(_x) {
        return _ref.apply(this, arguments);
    };
}();

var randomCondition = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var modelName = arguments.length <= 0 || arguments[0] === undefined ? "Main" : arguments[0];
        var condition = arguments.length <= 1 || arguments[1] === undefined ? "this.imageSrc===undefined" : arguments[1];
        var willReturn, rand;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        willReturn = {};
                        _context2.next = 3;
                        return countCondition(modelName, condition);

                    case 3:
                        willReturn.count = _context2.sent;
                        rand = Math.floor(Math.random() * willReturn.count);
                        _context2.next = 7;
                        return findOneSkipCondition(modelName, rand, condition);

                    case 7:
                        willReturn.main = _context2.sent;
                        return _context2.abrupt("return", willReturn.main);

                    case 9:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function randomCondition(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var increaseCounter = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var willReturn;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        willReturn = {};
                        _context3.next = 3;
                        return counter();

                    case 3:
                        willReturn.counterValue = _context3.sent;
                        _context3.next = 6;
                        return increaseCounterFn(willReturn.counterValue);

                    case 6:
                        willReturn.counter = _context3.sent;
                        return _context3.abrupt("return", willReturn.counter);

                    case 8:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function increaseCounter() {
        return _ref3.apply(this, arguments);
    };
}();

var addMain = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(saveData) {
        var willReturn;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        willReturn = {};
                        _context4.next = 3;
                        return counter();

                    case 3:
                        willReturn.counter = _context4.sent;
                        _context4.next = 6;
                        return save("Main", R.merge(saveData, { id: willReturn.counter }));

                    case 6:
                        willReturn.main = _context4.sent;

                        J.log(willReturn.main);
                        _context4.next = 10;
                        return increaseCounter();

                    case 10:
                        willReturn.holder = _context4.sent;
                        return _context4.abrupt("return", willReturn.main);

                    case 12:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function addMain(_x14) {
        return _ref4.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var J = require("justdo");
var R = require("ramda");
var mongoose = require("mongoose");
function gitHookTokenRead() {
    return new Promise(function (resolve) {
        mongoose.model("GitHookToken").findOne().exec(function (err, result) {
            resolve(result);
        });
    });
}
function gitHookTokenWrite(data) {
    J.log(data);
    return new Promise(function (resolve) {
        mongoose.model("GitHookToken").findOneAndUpdate({}, data, { new: true, upsert: true }).exec(function (err, result) {
            resolve(result);
        });
    });
}

function count() {
    var modelName = arguments.length <= 0 || arguments[0] === undefined ? "Main" : arguments[0];

    return new Promise(function (resolve) {
        mongoose.model(modelName).count().exec(function (err, count) {
            resolve(count);
        });
    });
}
function countCondition(modelName, condition) {
    return new Promise(function (resolve) {
        mongoose.model(modelName).count({ $where: condition }).exec(function (err, count) {
            resolve(count);
        });
    });
}
function findOneSkip() {
    var modelName = arguments.length <= 0 || arguments[0] === undefined ? "Main" : arguments[0];
    var skipValue = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return new Promise(function (resolve) {
        mongoose.model(modelName).findOne().skip(skipValue).exec(function (err, result) {
            resolve(result);
        });
    });
}
function findOneSkipCondition() {
    var modelName = arguments.length <= 0 || arguments[0] === undefined ? "Main" : arguments[0];
    var skipValue = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var condition = arguments[2];

    return new Promise(function (resolve) {
        mongoose.model(modelName).findOne({ $where: condition }).skip(skipValue).exec(function (err, result) {
            resolve(result);
        });
    });
}
function findOneAndUpdateMain(data) {
    return new Promise(function (resolve) {
        mongoose.model("Main").findOneAndUpdate({ id: data.id }, data, { new: true }).exec(function (err, result) {
            resolve(result);
        });
    });
}
function counter() {
    return new Promise(function (resolve) {
        mongoose.model("Counter").find({}, function (error, incoming) {
            resolve(incoming[0].counter);
        });
    });
}
function save() {
    var modelName = arguments.length <= 0 || arguments[0] === undefined ? "Main" : arguments[0];
    var saveData = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return new Promise(function (resolve) {
        var Model = mongoose.model(modelName);
        Model(saveData).save(function (err, incoming) {
            resolve(incoming);
        });
    });
}
function increaseCounterFn(counterValue) {
    return new Promise(function (resolve) {
        mongoose.model("Counter").findOneAndUpdate({ $where: "this.counter>0" }, { counter: counterValue + 1 }, function (error, incoming) {
            resolve(incoming);
        });
    });
}

module.exports.addMain = function (data) {
    return addMain(data);
};
module.exports.random = function (modelName) {
    return new Promise(function (resolve) {
        random(modelName).then(function (data) {
            resolve(data);
        });
    });
};
module.exports.randomCondition = function (modelName, condition) {
    return randomCondition(modelName, condition);
};
module.exports.increaseCounter = function () {
    return increaseCounter();
};
module.exports.findOneAndUpdateMain = findOneAndUpdateMain;
module.exports.findOneSkip = findOneSkip;
module.exports.findOneSkipCondition = findOneSkipCondition;
module.exports.count = count;
module.exports.addMain = addMain;
module.exports.save = save;
module.exports.countCondition = countCondition;
module.exports.gitHookTokenWrite = gitHookTokenWrite;
module.exports.gitHookTokenRead = gitHookTokenRead;
