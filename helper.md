# NPM holder

connect-ensure-login
mobx
mobx-react
passport
passport-twitter

# Naming convention patterns as functions
```
function learningMemePublish(data) {
    return new Promise(resolve=>{
        uploadImage.main(data).then(uploadImageData=>{
            resolve(uploadImageData)
        })
    })
}
```


# Naming convention patterns
- common names
```
handlePrevNavigation
handleNextNavigation
globalData
imageSearchResult
handleNext
handleEnInput
handleSearchInput
globalIndex
willBeIndex
domElement
childSafetyFlag
stopWordsFilter
initData
searchImageKeyword
dataFuture
dataHolder
dataObj
notificationMessage
rawSelectionShort
srcPath
saveData
.commonInput
```
- "main" - if JSON act as a holder for array of objects, then use "main" as the single object property

- "awaited*" - can be used in context of await keyword
```
let awaited = await willRunCommand("ls")
```
- "promised" - wrapped promise
- "promisedArr" - wrapped array of promise

- "*Raw" shows that the variable will take one more step before reaching clean state

```
let stateRaw = JSON.parse(data)
let state = R.replace(",","",stateRaw)
```
- pagination values
```
paginationIndex: 0,
paginationPerPageCount: 10
```

- "data" - is never set, always used as single result from a function
```
asyncAction.then((data)=>{
})
```

- "*Async" - name function using ES7 "async" in front of them

```
async function getDataAsync(){}
```

- willReturn - holder for function's return value

- *First"&&"*Second"&&...&&"*Tenth" - used when it is not that easy to came up with naming for variable or functions with similar purpose

- "local*" - temp value, required to specify the type, i.e. "localStr, localObj"

# Watching files

Running watch.js will start a "sane" watcher which will follow the following rules:
- every js file is linted
- every jsx file is processed with babelify
- every *Pre.js file is processed with babel with all the latest es6&es7 goods
- every *Front.jsx file is processed with babelify and placed in hapi/public
