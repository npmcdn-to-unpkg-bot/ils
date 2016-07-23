"use strict"
const R = require("ramda")

function pluckFn(prop, obj) {
    return R.compose(R.flatten, R.filter(val=>val !== false), R.values, R.mapObjIndexed((val, key)=>{
        if (key.includes(prop)) {
            return val
        } else {return false}
    }))(obj)
}
function sortFn(prop, obj) {
    return R.compose(R.sort((a, b)=>{
        return R.prop(prop, a).length - R.prop(prop, b).length
    }))(obj)
}

function main(translated) {
    let willSave = {}
    willSave.synonym = []
    willSave.synonymTranslated = []
    willSave.phrase = []
    willSave.phraseTranslated = []
    let deEnArr = pluckFn("deEn", translated)
    let synonymArr = pluckFn("phrase", translated)
    let phraseArr = pluckFn("phrase", translated)
    willSave.deEn = {dePart: `${deEnArr[ 0 ].dePart}`,
enPart: R.compose(R.join(","), R.uniq, R.sort((a, b)=>a.length - b.length), R.pluck("enPart"))(deEnArr)}
    R.map(val =>{
        if (val.enPart.length > 0) {
            if (val.dePart.length > 30) {
                willSave.phraseTranslated.push(val)
            } else {
                willSave.synonymTranslated.push(val)
            }
        } else {
            if (val.dePart.length > 30) {
                willSave.phrase.push(val)
            } else {
                willSave.synonym.push(val)
            }
        }
    }, synonymArr)
    R.map(val =>{
        if (val.enPart.length > 0) {
            willSave.phraseTranslated.push(val)
        } else {
            willSave.phrase.push(val)
        }
    }, phraseArr)
    willSave.synonym = sortFn("dePart", willSave.synonym)
    willSave.synonymTranslated = sortFn("dePart", willSave.synonymTranslated)
    willSave.phrase = sortFn("dePart", willSave.phrase)
    willSave.phraseTranslated = sortFn("dePart", willSave.phraseTranslated)
    return willSave
}
module.exports.main = main
