const textract = require("textract")
let url = "https://ilearnsmarter.com"
textract.fromUrl(url, (error, text )=>{
    console.log(text)
})
