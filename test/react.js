"use strict"
const J = require("justdo")
import React, {Component} from "react"
//import { expect } from "chai"
import expect from "unexpected"
import { shallow, mount, render } from "enzyme"
import Tested from "../hot/src/App.js"

describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(mount(<Tested />).html(), "to contain", "<div>")
    })
})
