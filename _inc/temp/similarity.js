"use strict"
let arr = []
let charCodeCache = []

module.exports = function(a,b) {
  if (!a || !b || !a.length || !b.length) return 0
  if (a === b) return 1
  var d = distance(a.toLowerCase(),b.toLowerCase())
  var longest = Math.max(a.length, b.length)
  return (longest-d)/longest
}

function distance(a, b) {
	if (a === b) {
		return 0;
	}

	var aLen = a.length;
	var bLen = b.length;

	if (aLen === 0) {
		return bLen;
	}

	if (bLen === 0) {
		return aLen;
	}

	var bCharCode;
	var ret;
	var tmp;
	var tmp2;
	var i = 0;
	var j = 0;

	while (i < aLen) {
		charCodeCache[i] = a.charCodeAt(i);
		arr[i] = ++i;
	}

	while (j < bLen) {
		bCharCode = b.charCodeAt(j);
		tmp = j++;
		ret = j;

		for (i = 0; i < aLen; i++) {
			tmp2 = bCharCode === charCodeCache[i] ? tmp : tmp + 1;
			tmp = arr[i];
			ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;
		}
	}

	return ret;
};