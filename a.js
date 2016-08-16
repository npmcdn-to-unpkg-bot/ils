var WebPageTest = require('webpagetest');
var wpt = new WebPageTest('www.webpagetest.org');

wpt.runTest('https://ilearnsmarter.com', function(err, data) {
  console.log(err || data);
});
