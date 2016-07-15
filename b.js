#!/usr/bin/env
'use strict'

const apeWatching = require('ape-watching')
const J = require('justdo')
let flag = true
apeWatching.watchFiles(["**/*.jsx", "**/*.js", "*.less", "!node_modules/**/*", "!tmp/**/*"], (ev, filename) => {
  J.log(filename)
  if(flag){
	  flag = false
	  J.box(filename)
	  setTimeout(()=>{
		  flag = true
	  },3000)
  }
})
