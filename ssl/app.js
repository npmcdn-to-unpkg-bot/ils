var express = require('express')
var fs = require('fs')
var https = require('https')

var ports =  [3001, 443]

var app = express()

var server = https.createServer(
  {
    key: fs.readFileSync('./tls/key.pem'),
    cert: fs.readFileSync('./tls/cert.pem')
  },
  app
)

server.listen(ports[1])
app.listen(ports[0])

app.use('/', (req, res) => {
  res.end('Hi')
})
app.use('/test', (req, res) => {
  res.end('Hi')
})
