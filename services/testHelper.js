import jsdom from "jsdom"
import jquery from "jquery"
import TestUtils from "react-addon-test-utils"
import {expect} from "chai"
import ReactDOM from "react-dom"

global.document = jsdom.jsdom("<!doctype html><html><body></body></html>")
global.window = global.document.defaultView
const $ = jquery(global.window)

function renderComponent(componentClass){
    const componentInstance = TestUtils.renderIntoDocument(<componentClass />)
    return $(ReactDOM.findDOMNode(componentInstance))
}
export {expect}
