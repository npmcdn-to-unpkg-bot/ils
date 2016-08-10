var express = require('express'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    path = require('path'),
    httpApp = express(),
    app = express()


var httpsOptions = {
    key: fs.readFileSync("/etc/letsencrypt/live/ilearnsmarter.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/ilearnsmarter.com/fullchain.pem")
}
httpApp.set('port', 3001);
httpApp.get("*", function (req, res, next) {
    res.redirect("https://" + req.headers.host + "/" + req.path);
});

// all environments
app.set('port', 443);
app.enable('trust proxy');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', (req,res)=>{
    res.send("done")
});

app.get('/test', (req,res)=>{
    res.send("done")
});


http.createServer(httpApp).listen(httpApp.get('port'), function() {
    console.log('Express HTTP server listening on port ' + httpApp.get('port'));
});

https.createServer(httpsOptions, app).listen(app.get('port'), function() {
    console.log('Express HTTPS server listening on port ' + app.get('port'));
});
