"use strict"
const keyboard = new window.keypress.Listener()

function runPaste() {
    document.execCommand('paste')
}
keyboard.simple_combo("alt s", function() {
  clipboard.copy("ß")
  runPaste()
})
keyboard.simple_combo("alt a", function() {
  clipboard.copy("ä")
  runPaste()
})
keyboard.simple_combo("alt o", function() {
  clipboard.copy("ö")
  runPaste()
})
keyboard.simple_combo("alt u", function() {
  clipboard.copy("ü")
  runPaste()
})
