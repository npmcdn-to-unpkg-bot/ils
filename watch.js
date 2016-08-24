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

                        if (!filepath.includes("Front.jsx")) {
                            _context.next = 11;
                            break;
                        }

                        J.log("Front.jsx");
                        J.log(commands.babelifyHapiProd);
                        _context.next = 7;
                        return willRunFixedCommand(commands.babelifyHapi);

                    case 7:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 11:
                        if (!filepath.includes("Pre.jsx")) {
                            _context.next = 23;
                            break;
                        }

                        J.log("Pre.jsx");
                        J.lg(commands.babelify);
                        _context.next = 16;
                        return willRunFixedCommand(commands.babelify);

                    case 16:
                        iMeanNothing = _context.sent;
                        _context.next = 19;
                        return willRunFixedCommand(commands.lintReact);

                    case 19:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 23:
                        if (!filepath.includes("Mob.jsx")) {
                            _context.next = 37;
                            break;
                        }

                        J.log("Mob.jsx");
                        _context.next = 27;
                        return willRunFixedCommand(commands.babel);

                    case 27:
                        iMeanNothing = _context.sent;
                        _context.next = 30;
                        return willRunFixedCommand(commands.babelifyHapiMob);

                    case 30:
                        iMeanNothing = _context.sent;
                        _context.next = 33;
                        return willRunFixedCommand(commands.removeMob);

                    case 33:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 37:
                        if (!(filepath.includes(".jsx") && filepath.includes("services"))) {
                            _context.next = 49;
                            break;
                        }

                        J.log("babelify services");
                        J.log(commands.babelify);
                        _context.next = 42;
                        return willRunFixedCommand(commands.babelify);

                    case 42:
                        iMeanNothing = _context.sent;
                        _context.next = 45;
                        return willRunFixedCommand(commands.lintReact);

                    case 45:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 49:
                        if (!(filepath.includes(".jsx") && filepath.includes("fth"))) {
                            _context.next = 57;
                            break;
                        }

                        J.log("babelify fth");
                        _context.next = 53;
                        return willRunFixedCommand(commands.babelify);

                    case 53:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 57:
                        if (!filepath.includes(".jsx")) {
                            _context.next = 65;
                            break;
                        }

                        J.log("react lint");
                        _context.next = 61;
                        return willRunFixedCommand(commands.lintReact);

                    case 61:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 65:
                        if (!filepath.includes("Pre.js")) {
                            _context.next = 76;
                            break;
                        }

                        J.log("babel lint");
                        _context.next = 69;
                        return willRunFixedCommand(commands.babel);

                    case 69:
                        iMeanNothing = _context.sent;
                        _context.next = 72;
                        return willRunFixedCommand(commands.lint);

                    case 72:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 76:
                        if (!filepath.includes(".less")) {
                            _context.next = 84;
                            break;
                        }

                        J.log("less");
                        _context.next = 80;
                        return willRunFixedCommand(commands.less);

                    case 80:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 84:
                        if (!(filepath.includes(".js") && !filepath.includes("Front"))) {
                            _context.next = 92;
                            break;
                        }

                        J.log("lint");
                        _context.next = 88;
                        return willRunFixedCommand(commands.lint);

                    case 88:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 92:
                        return _context.abrupt("return", false);

                    case 93:
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
    var srcMob = R.replace(".jsx", ".js", src);
    var output = R.replace(/(Pre\.jsx)|(Pre\.js)|(\.jsx)/g, ".js", src);
    var outputCss = R.replace(".less", ".css", src);
    var local = output.split("/");
    var name = local[local.length - 1];
    var nameMob = R.replace("Mob.js", "Front.js", local[local.length - 1]);
    var hapiLocation = __dirname + "/hapi/public/" + name;
    var hapiMobLocation = __dirname + "/hapi/public/" + nameMob;
    var presents = "-t [ babelify --presets [ react  es2015 stage-1 stage-3 stage-2 stage-0 ] ]";
    var presentsProd = "-t [ babelify --presets [ react  es2015 stage-1 stage-3 stage-2 stage-0 ] ] -t [ envify --NODE_ENV production ]";
    var eslintConfigOverkill = "--fix --debug --max-warnings 100 -o tmp/eslint.txt --no-ignore --cache --cache-location tmp --config";
    var eslintConfig = "--fix --max-warnings 500 --no-ignore --cache --cache-location tmp";
    willReturn.lintReact = "eslint " + src + " " + eslintConfig + " -c .eslintrcReact.json";
    willReturn.lint = "eslint " + src + " " + eslintConfig;
    willReturn.less = "lessc " + src + " " + outputCss;
    willReturn.ts = "tsc " + src;
    willReturn.removeMob = "rm " + output;
    willReturn.babel = "babel " + src + " --out-file " + output;
    willReturn.babelify = "browserify " + src + " -o " + output + " " + presents;
    willReturn.babelifyHapi = "browserify " + src + " -o " + hapiLocation + " " + presents;
    willReturn.babelifyHapiProd = "browserify " + src + " -o " + hapiLocation + " " + presentsProd;
    willReturn.babelifyHapiMob = "browserify " + srcMob + " -o " + hapiMobLocation + " " + presents;
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
