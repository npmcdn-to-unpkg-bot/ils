"use strict"
const J = require("justdo")
const expect = require("unexpected")
const request = require('superagent')
const mock = require('superagent-mocker')(request)
describe("static routes",()=>{
    it("should render relative react views",(done)=>{
        request.get('http://localhost:3000')
        .end((err, res)=>{
            expect(res.status,"to be", 200)
            done()
        })
    })
})
