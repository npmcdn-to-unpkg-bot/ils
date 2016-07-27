"use strict"
const fs = require("fs-extra")
const R = require("ramda")

function pluckFn(prop, obj) {
    return R.compose(R.flatten, R.filter(val=>val !== false), R.values, R.mapObjIndexed((val, key)=>{
        if (key.includes(prop) && val) {
            return val
        } else {return false}
    }))(obj)
}
function sortFn(prop, obj) {
    return R.compose(R.sort((a, b)=>{
        return R.prop(prop, a).length - R.prop(prop, b).length
    }))(obj)
}
function uniq(arr, prop) {
    let willReturn = []
    return R.compose(R.sort((a, b)=>b.dePart.length - a.dePart.length), R.filter(val=>{
        if (R.indexOf(val[ prop ], willReturn) === -1 && val[ prop ].length > 2) {
            willReturn.push(val[ prop ])
            return true
        } else {return false}
    }), R.map(val=>{
        return R.merge(val, {dePart: R.replace(/[0-9]/, "", val.dePart)})
    }))(arr)
}

function main(translated) {
    let willSave = {}
    willSave.synonym = []
    willSave.synonymTranslated = []
    willSave.phrase = []
    willSave.phraseTranslated = []
    let deEnArr = pluckFn("deEn", translated)
    let synonymArr = pluckFn("synonym", translated)
    let phraseArr = pluckFn("phrase", translated)
    willSave.deEn = {dePart: translated.word,
enPart: R.compose(R.join(","), R.uniq, R.sort((a, b)=>a.length - b.length), R.pluck("enPart"))(deEnArr)}

    R.map(val =>{
        if (val && val.enPart && val.enPart.length > 0) {
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
        if (val && val.enPart && val.enPart.length > 0) {
            willSave.phraseTranslated.push(val)
        } else {
            willSave.phrase.push(val)
        }
    }, phraseArr)
    willSave.synonym = uniq(willSave.synonym, "dePart")
    willSave.synonymTranslated = uniq(willSave.synonymTranslated, "dePart")
    willSave.phrase = uniq(willSave.phrase, "dePart")
    willSave.phraseTranslated = uniq(willSave.phraseTranslated, "dePart")
    return willSave
}
module.exports.main = main
