var async = require('async');
var common = require('../../common.js')
require('../../waitReady.js');
var fs = require('fs');
var stream = fs.createWriteStream('./inc/rar/custom/URLs.txt');
var urlString = 'https://www.gutenberg.org/ebooks/2321|https://www.gutenberg.org/ebooks/2406|https://www.gutenberg.org/ebooks/21000|https://www.gutenberg.org/ebooks/2230|https://www.gutenberg.org/ebooks/2229|https://www.gutenberg.org/ebooks/2146|https://www.gutenberg.org/ebooks/10428|https://www.gutenberg.org/ebooks/38281|https://www.gutenberg.org/ebooks/9327|https://www.gutenberg.org/ebooks/22493|https://www.gutenberg.org/ebooks/22494|https://www.gutenberg.org/ebooks/5322|https://www.gutenberg.org/ebooks/5072|https://www.gutenberg.org/ebooks/2189'
var urlArray = urlString.split('|')
describe('first test', function () {
    var saveIt
    beforeEach(function () {
        browser.ignoreSynchronization = true;
        //browser.get('https://www.gutenberg.org/wiki/DE_Drama_(B%C3%BCcherregal)');
        saveIt = ''
    });
    it('should y', function(done){
        var counter = 98
        function downloader(url, callback){
            browser.get(url);
            console.log('||11||',url)
            var willBeClicked = element(by.cssContainingText('a','Plain'))
            expect(willBeClicked.waitReady()).toBeTruthy()
            browser.sleep(3000)
            willBeClicked.click()
            console.log('||22||',url)
            var waitElement = element(by.css('body'))
            expect(waitElement.waitReady()).toBeTruthy()
            console.log('||33||',url)
            browser.sleep(3000)
            waitElement.getText().then(function(plainText){
                console.log('||44||',url)
                var pathStream = './inc/rar/data/drama'+ counter + '.txt'
                console.log(pathStream)
                var stream = fs.createWriteStream(pathStream);
                stream.write(plainText);
                browser.sleep(1000)
                console.log('||55||',url)
                counter++
                callback()
            })
        }
        async.mapLimit(urlArray, 1, downloader, function(){
            console.log('done')
            done()
        })
    })

    xit('should prove x', function (done) {
        var waitElement = element.all(by.tagName('li')).get(7)
        expect(waitElement.waitReady()).toBeTruthy()

        element.all(by.tagName('li')).each(function(singleElement){
            singleElement.getInnerHtml().then(function(innerHtml){
                if(innerHtml.indexOf('BookIcon')>-1){
                    singleElement.all(by.tagName('a')).first().getAttribute('href').then(function(hrefAttribute){
                        saveIt += hrefAttribute + '|'
                    })
                }
            })
        }).then(function(){
            done()
        })
    });

    xit('should prove x', function (done) {
        element(by.css("input[name='password']")).sendKeys("q1w2e3r4Q");
        expect(browser.getCurrentUrl()).toContain("checkout/paymentData");

        elementX.isDisplayed().then(function(elementIsVisible){
                if(elementIsVisible){
                }
        })

        browser.actions().mouseMove(elementsX.get(index)).perform()
        .then(function () {
         })
    });

    afterEach(function () {
        stream.write(saveIt);
        browser.manage().deleteAllCookies();
        browser.executeScript("window.sessionStorage.clear();");
        browser.executeScript("window.localStorage.clear();");
    });
});
