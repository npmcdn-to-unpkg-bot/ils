import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from '../../node_modules/react/lib/ReactTestUtils.js';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = _$(window);

chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}) {
  const componentInstance =  TestUtils.renderIntoDocument(
      <ComponentClass {...props} />
  )

  return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect};
