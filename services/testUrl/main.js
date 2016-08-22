"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var mainAsync = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(url) {
        var willReturn;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        willReturn = {};
                        _context.next = 3;
                        return browserPerf.main(url);

                    case 3:
                        willReturn.browserPerf = _context.sent;

                        if (url.includes("localhost")) {
                            _context.next = 8;
                            break;
                        }

                        _context.next = 7;
                        return pageSpeedInsights.main(url);

                    case 7:
                        willReturn.pageSpeedInsights = _context.sent;

                    case 8:
                        _context.next = 10;
                        return yellowLab.main(url);

                    case 10:
                        willReturn.yellowLab = _context.sent;
                        return _context.abrupt("return", willReturn);

                    case 12:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function mainAsync(_x) {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browserPerf = require("./browserPerf");
var pageSpeedInsights = require("./pageSpeedInsights");
var yellowLab = require("./yellowLab");
var fs = require("fs-extra");

function main(url) {
    return new Promise(function (resolve) {
        mainAsync("https://ilearnsmarter.com/" + url).then(function (ilsData) {
            mainAsync("http://localhost:3000/" + url).then(function (localhostData) {
                resolve({ ils: ilsData, localhost: localhostData });
            });
        });
    });
}
function ils(url) {
    return mainAsync("https://ilearnsmarter.com/" + url);
}
function localhost(url) {
    return mainAsync("http://localhost:3000/" + url);
}
module.exports.main = main;
module.exports.ils = ils;
module.exports.localhost = localhost;
