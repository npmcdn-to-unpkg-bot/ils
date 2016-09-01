let J = require("justdo")
let fs = require("fs")
var suppose = require('suppose')
suppose('monaca',["upload"], {debug: fs.createWriteStream('/home/just/ils/services/debug.txt')})
  .when(/you/g).respond('y\n')
.on('error', function(err){
  console.log(err);
})
.end(function(code){
    J.log(code)
    J.log(code)
})
//J.willRunFixedCommand("monaca").then(data=>{
