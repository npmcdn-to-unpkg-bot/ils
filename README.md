# i-learn-smarter
The current code base of my project in progress

# Naming convention patterns

- "incoming"||"incoming*"||"data" - is never set, always used as single result from a function or as function argument
```
asyncAction.then((data)=>{
})
//or
function J(incoming){

}
```

- "*Async" - name function using ES7 "async" in front of them

```
async function getDataAsync(){}
```

- "im*" - immutable.js related function or variable

- "*Is" - used as defensive approach for not accidentally overwriting global variables
```
const winWidthIs = window.innerWidth
```

- willReturn - usually set inside a function, rarely as global scope variable

- "will*" - when it is not "willReturn" indicates name of function

- "bul*" - Bulma.css related strings
```
let bulMobile = "is-hidden-desktop-only is-hidden-tablet-only is-hidden-widescreen"
```
# Watching files

Running watch.js will start a "sane" watcher which will follow the following rules:
- every js file is linted
- every jsx file is processed with babelify
- every *Pre.js file is processed with babel with all the latest es6&es7 goods
- every *Front.jsx file is processed with babelify and placed in hapi/public
