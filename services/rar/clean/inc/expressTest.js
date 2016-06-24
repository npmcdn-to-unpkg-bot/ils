var request = require("supertest")
var app = require("../../app.js")
var assert = require("unexpected")
var sinon = require("sinon")
var order = require("../../routes/order")

describe("GET",function() {
    var stubbed = null

    afterEach(function() {
        stubbed.restore()
    })
    it("should return 404",function(done) {
        stubbed = sinon.spy(order,"get")
        request(app)
            .get("/v1/")
            .expect(404)
            .end(function (error,response) {
                assert(error,"to be null")
                assert(response.statusCode,"to be",404)
                assert(stubbed.callCount,"to be",0)
                done()
            })
    })

    it("should return 200",function(done) {
        stubbed = sinon.spy(order,"get")
        request(app)
            .get("/order")
            .expect(200)
            .end(function (error,response) {
                assert(error,"to be null")
                assert(response.statusCode,"to be",200)
                assert(stubbed.callCount,"to be",0)
                done()
            })
    })
})