const scrape = require("./inc/scrape")
let cheerio = require('cheerio')
function main(url){
    return new Promise(resolve=>{
        scrape(url, {userAgent: ""}).then(data=> {
        if (!data) {
          throw new Error("No scraped result received.")
        }
        let $ = cheerio.load(data.content)
        resolve($(".content").text())
        }).catch(console.log)
    })
}
module.export.main=main
