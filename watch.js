#!/usr/bin/env


"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filepath) {
        var iMeanNothing, command;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        iMeanNothing = void 0;
                        command = commandFactory(filepath);

                        if (!(filepath.includes("hot/src") && filepath.includes(".js") && !filepath.includes("index") && !filepath.includes("components"))) {
                            _context.next = 12;
                            break;
                        }

                        J.log("hot src");
                        J.log(command.babelifyHapiAlt);
                        _context.next = 7;
                        return willRunFixedCommand(command.babelifyHapiAlt);

                    case 7:
                        iMeanNothing = _context.sent;

                        J.log(command.babelifyHapiAltProd);
                        return _context.abrupt("return", iMeanNothing);

                    case 12:
                        if (!(filepath.includes("hot") && filepath.includes(".less"))) {
                            _context.next = 20;
                            break;
                        }

                        J.log("hot less");
                        _context.next = 16;
                        return willRunFixedCommand(command.lessHapi);

                    case 16:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 20:
                        if (!filepath.includes("Front.jsx")) {
                            _context.next = 29;
                            break;
                        }

                        J.log("Front.jsx");
                        J.log(command.babelifyHapi);
                        _context.next = 25;
                        return willRunFixedCommand(command.babelifyHapi);

                    case 25:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 29:
                        if (!filepath.includes("Pre.jsx")) {
                            _context.next = 41;
                            break;
                        }

                        J.log("Pre.jsx");
                        J.lg(command.babelify);
                        _context.next = 34;
                        return willRunFixedCommand(command.babelify);

                    case 34:
                        iMeanNothing = _context.sent;
                        _context.next = 37;
                        return willRunFixedCommand(command.lintReact);

                    case 37:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 41:
                        if (!(filepath.includes(".jsx") && filepath.includes("service"))) {
                            _context.next = 53;
                            break;
                        }

                        J.log("babelify service");
                        J.log(command.babelify);
                        _context.next = 46;
                        return willRunFixedCommand(command.babelify);

                    case 46:
                        iMeanNothing = _context.sent;
                        _context.next = 49;
                        return willRunFixedCommand(command.lintReact);

                    case 49:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 53:
                        if (!filepath.includes(".jsx")) {
                            _context.next = 61;
                            break;
                        }

                        J.log("react lint");
                        _context.next = 57;
                        return willRunFixedCommand(command.lintReact);

                    case 57:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 61:
                        if (!filepath.includes("Pre.js")) {
                            _context.next = 72;
                            break;
                        }

                        J.log("babel lint");
                        _context.next = 65;
                        return willRunFixedCommand(command.babel);

                    case 65:
                        iMeanNothing = _context.sent;
                        _context.next = 68;
                        return willRunFixedCommand(command.lint);

                    case 68:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 72:
                        if (!filepath.includes(".less")) {
                            _context.next = 80;
                            break;
                        }

                        J.log("less");
                        _context.next = 76;
                        return willRunFixedCommand(command.less);

                    case 76:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 80:
                        if (!(filepath.includes(".js") && !filepath.includes("Front") && !filepath.includes("only"))) {
                            _context.next = 88;
                            break;
                        }

                        J.log("lint");
                        _context.next = 84;
                        return willRunFixedCommand(command.lint);

                    case 84:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 88:
                        return _context.abrupt("return", false);

                    case 89:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function main(_x) {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var watcher = require("ape-watching");
var J = require("./common.js");
var R = require("ramda");
var fileExists = require("file-exists");
var exec = require("child_process").exec;
var mainFlag = true;
var negativeWordArr = ["node_modules", "eslint", ".log", "git", ".json", "App.js", "cache"];
var filterFn = J.anyFn(negativeWordArr);

watcher.watchFiles(["**/*.jsx", "**/*.js", "**/*.less"], function (ev, filepath) {
    if (filterFn(function (negativeWord) {
        return filepath.includes(negativeWord);
    })) {
        return null;
    } else {
        if (mainFlag === true) {
            mainFlag = false;
            if (fileExists(filepath)) {
                J.box("⚡⚡⚡  " + J.takeName(filepath) + " Will Start  ⚡⚡⚡");
                main(filepath).then(function (incoming) {
                    setTimeout(function () {
                        mainFlag = true;
                    }, 1000);
                    J.log("💡💡💡  " + J.takeName(filepath) + " Is Over  💡💡💡");
                });
            } else {
                setTimeout(function () {
                    mainFlag = true;
                }, 1000);
            }
        }
    }
});
function commandFactory(src) {
    var willReturn = {};
    var output = R.replace(/(Pre\.jsx)|(Pre\.js)|(\.jsx)/g, ".js", src);
    var outputCss = R.replace(".less", ".css", src);
    var name = R.compose(R.last, R.split("/"))(output);
    var nameClean = R.replace(/\.js|\.less/, "", name);
    var srcHot = __dirname + "/hot/front/" + nameClean + ".jsx";
    var outputCssHapi = __dirname + "/hapi/public/css/" + nameClean + ".css";
    var hapiLocation = __dirname + "/hapi/public/" + name;
    var hapiLocationAlt = __dirname + "/hapi/public/" + nameClean + "Front.js";
    var presents = "-t [ babelify --presets [ react  es2015 stage-1 stage-3 stage-2 stage-0 ] ]";
    var presentsLite = "-t [ babelify --presets [ react  es2015 ] ]";
    var presentsProd = "-t [ babelify --presets [ react  es2015 stage-1 stage-3 stage-2 stage-0 ] ] -t [ envify --NODE_ENV production ]";
    var eslintConfigExtra = "--fix --debug --max-warnings 100 -o tmp/eslint.txt --no-ignore --cache --cache-location tmp --config";
    var eslintConfig = "--fix --max-warnings 500 --no-ignore --cache --cache-location tmp";
    willReturn.lintReact = "eslint " + src + " " + eslintConfigExtra + " -c .eslintrcReact.json";
    willReturn.lint = "eslint " + src + " " + eslintConfig;
    willReturn.less = "lessc " + src + " " + outputCss;
    willReturn.lessHapi = "lessc " + src + " " + outputCssHapi;
    willReturn.ts = "tsc " + src;
    willReturn.babel = "babel " + src + " --out-file " + output;
    willReturn.babelify = "browserify " + src + " -o " + output + " " + presents;
    willReturn.babelifyHapi = "browserify " + src + " -o " + hapiLocation + " " + presentsLite;
    willReturn.babelifyHapiAlt = "browserify " + srcHot + " -o " + hapiLocationAlt + " " + presentsLite;
    willReturn.babelifyHapiProd = "browserify " + src + " -o " + hapiLocation + " " + presentsProd;
    willReturn.babelifyHapiAltProd = "browserify " + srcHot + " -o " + hapiLocation + " " + presentsProd;
    return willReturn;
}

function willRunFixedCommand(commandIs) {
    return new Promise(function (resolve) {
        var proc = exec(commandIs);
        proc.stdout.on("data", function (chunk) {
            console.log(chunk.toString());
        });
        proc.stdout.on("error", function (error) {
            console.error(error);
        });
        proc.stdout.on("end", function () {
            resolve(true);
        });
        proc.stdout.on("error", function (error) {
            console.error(error);
            resolve(error);
        });
    });
}
