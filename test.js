"use strict";
//CAN BE COMMENTED OUT

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exec = require("child_process").exec;
var fs = require("fs-extra");
var request = require("request");
var env = require("dotenv-helper");
var R = require("ramda");
//DONT MOVE
var J = require("justdo");
var expect = require("unexpected");
var tested = require("./_inc/db");
//const tested = require("./admin/_inc/a")
//const tested = require("./a")
//const tested = require("./b")
describe("proud-db", function () {
    it("should work", function (done) {
        var wrapper = function () {
            var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return tested.save("parent", "key", "value");

                            case 2:
                                _context.t0 = _context.sent;
                                expect(_context.t0, "to be", true);
                                _context.next = 6;
                                return tested.load("parent", "key");

                            case 6:
                                _context.t1 = _context.sent;
                                expect(_context.t1, "to be", "value");
                                _context.next = 10;
                                return tested.save("parent", "key", "val");

                            case 10:
                                _context.t2 = _context.sent;
                                expect(_context.t2, "to be", null);
                                _context.next = 14;
                                return tested.load("parent", "key");

                            case 14:
                                _context.t3 = _context.sent;
                                expect(_context.t3, "to be", "value");
                                _context.next = 18;
                                return tested.save("parent", "key", "val", true);

                            case 18:
                                _context.t4 = _context.sent;
                                expect(_context.t4, "to be", true);
                                _context.next = 22;
                                return tested.load("parent", "key");

                            case 22:
                                _context.t5 = _context.sent;
                                expect(_context.t5, "to be", "val");
                                _context.next = 26;
                                return tested.remove("parent", "key");

                            case 26:
                                _context.t6 = _context.sent;
                                expect(_context.t6, "to be", true);
                                _context.next = 30;
                                return tested.loadParent("parent");

                            case 30:
                                _context.t7 = _context.sent;
                                expect(_context.t7, "to be empty");
                                _context.next = 34;
                                return tested.removeParent("parent");

                            case 34:
                                _context.t8 = _context.sent;
                                expect(_context.t8, "to be", true);
                                _context.next = 38;
                                return tested.loadParent("parent");

                            case 38:
                                _context.t9 = _context.sent;
                                expect(_context.t9, "to be falsy");

                            case 40:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
            return function wrapper() {
                return ref.apply(this, arguments);
            };
        }();

        wrapper().then(done);
    });
});
//WILLEXPORT
function will(moreIsLess) {
    return new Promise(function (resolve) {
        resolve(true);
    });
}
//TESTING BOILERPLATE
function willRunFixedCommand(commandIs) {
    J.log(commandIs);
    return new Promise(function (resolve, reject) {
        var proc = exec(commandIs, {
            "cwd": __dirname
        });
        proc.stdout.on("data", function (chunk) {
            J.lg(chunk);
        });
        proc.stdout.on("error", function (error) {
            console.error(error);
        });
        proc.stdout.on("end", function () {
            resolve(true);
        });
        proc.stdout.on("error", function (error) {
            console.error(error);
            reject(error);
        });
    });
}

function randomIndex(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function isEmpty(question) {
    return R.isEmpty(question) || question === null || question === undefined;
}
