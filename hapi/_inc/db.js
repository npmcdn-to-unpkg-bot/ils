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

var increaseCounter = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var willReturn;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        willReturn = {};
                        _context2.next = 3;
                        return counter();

                    case 3:
                        willReturn.counterValue = _context2.sent;
                        _context2.next = 6;
                        return increaseCounterFn(willReturn.counterValue);

                    case 6:
                        willReturn.counter = _context2.sent;
                        return _context2.abrupt("return", willReturn.counter);

                    case 8:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function increaseCounter() {
        return _ref2.apply(this, arguments);
    };
}();

var addMain = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var saveData = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var willReturn;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        willReturn = {};
                        _context3.next = 3;
                        return counter();

                    case 3:
                        willReturn.counter = _context3.sent;
                        _context3.next = 6;
                        return save("Main", R.merge(saveData, { id: willReturn.counter }));

                    case 6:
                        willReturn.main = _context3.sent;
                        _context3.next = 9;
                        return increaseCounter();

                    case 9:
                        willReturn.holder = _context3.sent;
                        return _context3.abrupt("return", willReturn.main);

                    case 11:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function addMain(_x8) {
        return _ref3.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var J = require("justdo");
var R = require("ramda");
var mongoose = require("mongoose");

function count() {
    var modelName = arguments.length <= 0 || arguments[0] === undefined ? "Main" : arguments[0];

    return new Promise(function (resolve) {
        mongoose.model(modelName).count().exec(function (err, count) {
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
module.exports.random = function (data) {
    return random(data);
};
module.exports.counter = counter;
module.exports.increaseCounter = function () {
    return increaseCounter();
};
