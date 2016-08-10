let uploadImage = require("./_inc/uploadImage")
let obj = {
    imageSrc: "http://www.katholisch.at/img/9d/ab/2784e85e93bdaeb9ad9d/Marsch_fuer_Jesus-20160618_5358-preview.jpg",
    dePart:"mehr",
    enPart:"more"
}
uploadImage.main(obj).then(console.log)
