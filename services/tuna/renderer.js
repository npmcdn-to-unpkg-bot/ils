import {ipcRenderer} from "electron"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './view.jsx';

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg)
})
ipcRenderer.send('asynchronous-message', 'ping')

window.onload = function(){
  ReactDOM.render(<App />, document.getElementById("reactHook"));
}
