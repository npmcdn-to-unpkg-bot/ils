async function willTranslate(word) {
    let translated = await translate.deEn(word)
    return bringOrderTranslation.main(translated)
}
async function willUpdate(parent, data) {
    let iMeanNothing
    for (let val of data) {
        iMeanNothing = await proudDb.save(parent, `${val.id}`, val)
        J.log(iMeanNothing)
    }
    return iMeanNothing
}
async function learningMeme(data) {
    let uploadImageResult = await uploadImage.main(data)
    let {imageSrc, imageName} = uploadImageResult
    return await proudDb.save("data", `${data.id}`, R.merge(data, {imageSrc, imageName}))
}
async function willAddDraft(data) {
    return await proudDb.save("data", `${data.id}`, data)
}
async function willUpdateSingle(data) {
    return await proudDb.save("data", `${data.id}`, data)
}
async function willAddEntry(parent, dataRaw) {
    let indexFuture = await proudDb.loadParent("nextIndex")
    let data = R.merge(dataRaw, {id: indexFuture})
    let iMeanNothing = await proudDb.saveParent("nextIndex", indexFuture + 1)
    iMeanNothing = await proudDb.save(parent, `${data.id}`, data)
    return iMeanNothing
}
let getPredraftCategory = R.compose(R.filter((val)=>{
    return R.prop("category", val) === "preDraft"
}))
async function willBulkRemove(marker) {
    let dataState = await proudDb.loadParent("data")
    let predraftCategory = getPredraftCategory(dataState)
    let willRemoveIndexArr = []
    let dropByIndex = R.compose(R.values, R.map(R.set(R.lensProp("category"), "draft")), R.filter((val)=>{
        if (R.lte(R.prop("id", val), marker)) {
            if (R.prop("enPart", val).length > 0) {
                return true
            } else {
                willRemoveIndexArr.push(R.prop("id", val))
                return false
            }
        } else {
            return false
        }
    }))
    let willChangeCategoryArr = dropByIndex(predraftCategory)
    let iMeanNothing
    for (let removeMarker of willRemoveIndexArr) {
        J.log(removeMarker, "remove")
        J.log(dataState[ removeMarker ])
        iMeanNothing = await proudDb.remove("data", `${removeMarker}`)
    }
    for (let updateValue of willChangeCategoryArr) {
        J.log(updateValue, "update")
        iMeanNothing = await proudDb.save("data", `${updateValue.id}`, updateValue)
    }
    return iMeanNothing
}
function willPublish(keyword, content) {
    return new Promise((resolve)=>{
        fs.outputFile(`${twoLevelUp(__dirname)}/hapi/blog/${keyword}.md`, content, ()=>{
            resolve(true)
        })
    })
}
