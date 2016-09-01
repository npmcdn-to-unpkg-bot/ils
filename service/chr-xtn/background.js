"use strict"
chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.create({ "url": "chrome-extension://" + chrome.runtime.id + "/options.html"})
})
