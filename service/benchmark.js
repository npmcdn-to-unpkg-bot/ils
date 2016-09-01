var Benchmark = require('benchmark');var suite = new Benchmark.Suite;
const J = require("./common")
// add tests
suite.add('RegExp#test', function(done) {
  ///o/.test('Hello World!');
  J.willRunFixedCommand("ls").then(()=>{
      done()
  })
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
var suite = new Benchmark.Suite;
