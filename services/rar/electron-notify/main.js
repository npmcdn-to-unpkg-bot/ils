'use strict';
const electron = require('electron')
const ipcMain = require('electron').ipcMain
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
let window
const reqwest = require("reqwest")
const PubSub = require("pubsub-js")

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
})

const http = require('http')
const server = http.createServer()
server.on('request', function(request, response) {
	let body = []
	request.on('data', function(chunk) {
		body.push(chunk)
	}).on('end', function() {
		body = Buffer.concat(body).toString()
		let local = body.split("&")
		let flag = local[0].replace("flag=","")
		let query = local[1].replace("rawObject=","")
		PubSub.publish(flag, query)
		response.end(`${flag} ${query}`)
	})
})

server.listen(3007)
app.on('ready', function () {
    var electronScreen = electron.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    window = new BrowserWindow({
        width: Math.floor(size.width*1),
        height: Math.floor(size.height*0.2),
        x:0,
        y:Math.floor(size.height*0.8),
        //backgroundColor: '#2F2',
        alwaysOnTop: true,
        //acceptFirstMouse: true,
        title: 'LazyDeveloperNotification',
        webSecurity: false,
        allowDisplayingInsecureContent: true,
        allowRunningInsecureContent: true,
        plugins: false,
        experimentalFeatures: true,
        sharedWorker: false
        //transparent: true
    })

	ipcMain.on('close', function(event, arg) {
		console.log(arg);  // prints "ping"
		window.minimize()
	})
	ipcMain.on('open', function(event, arg) {
		window.show()
		setTimeout(function(){
			window.minimize()
		}, 3000)
	})
    window.minimize()
    let sendingData = (msg, data) =>{
	    let local = {}
	    local.data = data
	    local.msg = msg
        window.webContents.send('data', JSON.stringify(local));
    }

	let logging = (data) =>{
		window.webContents.send('logging', data);
	}

	PubSub.subscribe("default", sendingData)
    window.webContents.on('did-finish-load', function () {
        //window.setProgressBar(0.85)
    })
    window.loadURL('file://' + __dirname + '/index.html');
    window.webContents.openDevTools();
    window.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        window = null;
    })
})