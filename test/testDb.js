"use strict";

var J = require("../common");
var expect = require("unexpected");
var sinon = require("sinon");
var mongoose = require("mongoose");
var mockgoose = require("mockgoose");
var db = require("../hapi/_inc/db");
var testModel = void 0;
var mongooseData = require("../hapi/_inc/mongooseData");
describe("mongoose", function () {
    before(function (done) {
        mockgoose(mongoose).then(function () {
            mongoose.connect(J.config.mongooseConnection, function (err) {
                mongooseData.initSchemas();
                var model = mongoose.model("Main");
                var Model = new model({
                    id: 44,
                    deWord: "mehr",
                    enWord: "more",
                    dePart: "mehr ist weniger",
                    enPart: "more is less",
                    imageSrc: {
                        sourceUrl: "sourceUrlData",
                        originalUrl: "originalUrlData"
                    },
                    category: "quotes",
                    childSafetyFlag: true
                });

                Model.save(function (error, data, numRowsAffected) {
                    if (!error) {
                        testModel = data;
                    }
                    done(error);
                });
            });
        });
    });
    afterEach(function (done) {
        mockgoose.reset();
        done();
    });
    it("counter should return number - mockgoose", function (done) {
        db.count().then(function (data) {
            expect(data, "to be", 1);
            done();
        });
    });
    it("counter should return number - stub", function (done) {
        var stub = sinon.stub(db, "count", function () {
            return new Promise(function (resolve) {
                return resolve(1);
            });
        });
        db.count().then(function (data) {
            expect(stub.notCalled, "to be", false);
            expect(stub.calledOnce, "to be", true);
            done();
        });
    });
});
