const winWidthIs = window.innerWidth*1
const winHeightIs = window.innerHeight*1
const singleGridInPxs = Math.floor(winWidthIs/12)
const topGitter = Math.floor(winWidthIs/33)
const heightInPxs = Math.floor(winHeightIs/12)
const noEighter = Math.floor(singleGridInPxs/8)
const noEighterHeight = Math.floor(heightInPxs/8)
const noQuarter = Math.floor(singleGridInPxs/4)
const noQuarterHeight = Math.floor(heightInPxs/4)
const noHalfer = Math.floor(singleGridInPxs/2)
const noHalferHeight = Math.floor(heightInPxs/2)
console.log(singleGridInPxs, heightInPxs, topGitter)
