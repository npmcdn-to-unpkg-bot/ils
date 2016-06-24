'use strict';

var options = require('./options.json')
chrome.storage.local.get(function (data) {
	console.log(data[options.main.firstBooleanSelect.keyValue])
	console.log(data[options.main.secondBooleanSelect.keyValue])
	console.log(data[options.main.firstStringInput.keyValue])
	console.log(data[options.main.secondStringInput.keyValue])
	console.log(data[options.main.firstTagInput.keyValue])
})
