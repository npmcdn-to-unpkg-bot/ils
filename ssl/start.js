var le = require('letsencrypt').create({ server: 'staging' });

var opts = {
  domains: ['example.com'], email: 'user@email.com', agreeTos: true
};

le.register(opts).then(function (certs) {
  console.log(certs);
  // privkey, cert, chain, expiresAt, issuedAt, subject, altnames
}, function (err) {
  console.error(err);
})
const expressApp = require("./app")
const http = require("http")
let port = "3001"
        expressApp.set('port', port)
        let server = http.createServer(expressApp)
        server.listen(port)
        server.on('error', onError)
        server.on('listening', ()=>{
          console.log(`Listening on ${server.address().port}`)
        })


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
