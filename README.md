# i-learn-smarter
The current code base of my project in progress

# Watching files

Running watch.js will start a "sane" watcher which will follow the following rules:
- every js file is linted
- every jsx file is processed with babelify
- every *Pre.js file is processed with babel with all the latest es6&es7 goods
- every *Front.jsx file is processed with babelify and placed in hapi/public
