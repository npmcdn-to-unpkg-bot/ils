const LineByLineReader = require('line-by-line')

function main(){
    return new Promise(resolve=>{
        let willReturn = []
        let rl = new LineByLineReader('./translateDraftGeneratorWords.txt')
        rl.on('line', function(line, lineCount, byteCount) {
           if(line.trim()!==""){
               willReturn.push(line)
           }
        })
        rl.on('end', function(line, lineCount, byteCount) {
             resolve(willReturn)
        })
    })
}
main().then(console.log)
