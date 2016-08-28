#!/usr/bin/env

"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var processFn = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filepath) {
        var iMeanNothing, commands;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        iMeanNothing = void 0;
                        commands = factoryCommands(filepath);

                        if (!(filepath.includes("hot/src") && filepath.includes(".js") && !filepath.includes("index") && !filepath.includes("components"))) {
                            _context.next = 12;
                            break;
                        }

                        J.log("hot src");
                        J.log(commands.babelifyHapiAlt);
                        _context.next = 7;
                        return willRunFixedCommand(commands.babelifyHapiAlt);

                    case 7:
                        iMeanNothing = _context.sent;

                        J.log(commands.babelifyHapiAlt);
                        return _context.abrupt("return", iMeanNothing);

                    case 12:
                        if (!(filepath.includes("hot") && filepath.includes(".less"))) {
                            _context.next = 23;
                            break;
                        }

                        J.log("hot less");
                        _context.next = 16;
                        return willRunFixedCommand(commands.less);

                    case 16:
                        iMeanNothing = _context.sent;
                        _context.next = 19;
                        return willRunFixedCommand(commands.lessHapi);

                    case 19:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 23:
                        if (!filepath.includes("Front.jsx")) {
                            _context.next = 32;
                            break;
                        }

                        J.log("Front.jsx");
                        J.log(commands.babelifyHapi);
                        _context.next = 28;
                        return willRunFixedCommand(commands.babelifyHapi);

                    case 28:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 32:
                        if (!filepath.includes("Pre.jsx")) {
                            _context.next = 44;
                            break;
                        }

                        J.log("Pre.jsx");
                        J.lg(commands.babelify);
                        _context.next = 37;
                        return willRunFixedCommand(commands.babelify);

                    case 37:
                        iMeanNothing = _context.sent;
                        _context.next = 40;
                        return willRunFixedCommand(commands.lintReact);

                    case 40:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 44:
                        if (!(filepath.includes(".jsx") && filepath.includes("services"))) {
                            _context.next = 56;
                            break;
                        }

                        J.log("babelify services");
                        J.log(commands.babelify);
                        _context.next = 49;
                        return willRunFixedCommand(commands.babelify);

                    case 49:
                        iMeanNothing = _context.sent;
                        _context.next = 52;
                        return willRunFixedCommand(commands.lintReact);

                    case 52:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 56:
                        if (!filepath.includes(".jsx")) {
                            _context.next = 64;
                            break;
                        }

                        J.log("react lint");
                        _context.next = 60;
                        return willRunFixedCommand(commands.lintReact);

                    case 60:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 64:
                        if (!filepath.includes("Pre.js")) {
                            _context.next = 75;
                            break;
                        }

                        J.log("babel lint");
                        _context.next = 68;
                        return willRunFixedCommand(commands.babel);

                    case 68:
                        iMeanNothing = _context.sent;
                        _context.next = 71;
                        return willRunFixedCommand(commands.lint);

                    case 71:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 75:
                        if (!filepath.includes(".less")) {
                            _context.next = 83;
                            break;
                        }

                        J.log("less");
                        _context.next = 79;
                        return willRunFixedCommand(commands.less);

                    case 79:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 83:
                        if (!(filepath.includes(".js") && !filepath.includes("Front"))) {
                            _context.next = 91;
                            break;
                        }

                        J.log("lint");
                        _context.next = 87;
                        return willRunFixedCommand(commands.lint);

                    case 87:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 91:
                        return _context.abrupt("return", false);

                    case 92:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function processFn(_x) {
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
                processFn(filepath).then(function (incoming) {
                    setTimeout(function () {
                        mainFlag = true;
                    }, 1000);
                    J.log("💡💡💡  " + J.takeName(filepath) + " Is Over  💡💡💡");
                });
            } else {
                J.lg("file does not exist?!");
                setTimeout(function () {
                    mainFlag = true;
                }, 1000);
            }
        }
    }
});

function factoryCommands(src) {
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
