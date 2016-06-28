# i-learn-smarter
The current code base of my project in progress

# Naming convention patterns
- "main" - if JSON act as a holder for array of objects, then use "main" as the single object property
- width comes before height 

- "awaited*" - can be used in context of await keyword
```
let awaited = await willRunCommand("ls")
```
- "promised" - wrapped promise
- "state" - rich man's "temp" value. Avoid use in React code

- "*Raw" shows that the variable will take one more step before reaching clean state

```
let stateRaw = JSON.parse(data)
let state = R.replace(",","",stateRaw)
```

- "incoming"||"incoming*"||"data" - is never set, always used as single result from a function or as function argument
data should be first to use, unless it is a async data call and thus "incoming" pattern becomes more relevant
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
- *First"&&"*Second"&&...&&"*Tenth" - used when it is not that easy to came up with naming for variable or functions with similar purpose

- "local*" - temp value, required to specify the type, i.e. "localStr, localObj"

# Filename and directory conventions

- Directory is prefixed with "_" to ensure its top IDE view

- File is prefixed with "z" to ensure its bottom IDE view

# Watching files

Running watch.js will start a "sane" watcher which will follow the following rules:
- every js file is linted
- every jsx file is processed with babelify
- every *Pre.js file is processed with babel with all the latest es6&es7 goods
- every *Front.jsx file is processed with babelify and placed in hapi/public
