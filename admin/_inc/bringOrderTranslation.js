"use strict"
const R = require("ramda")
const J = require("../../common")
let sortByName = R.sortBy(R.compose(R.toLower, R.prop('dePart')))

function main(incoming){
	let willReturn = {}
	let deWord
	let deWordFlag = true
	let enWord = []
	let willReturnTranslation = []
	let willReturnRelated = []
	let willReturnExamples = []
	let bufferTranslation = []
	let bufferRelated = []
	let bufferRelatedSecond = []
	let bufferExamples = []
	for(let stateKey in incoming){

		let stateValue = incoming[stateKey]

		if(stateKey.includes("deEn")&&isClean(stateValue)){
			stateValue.map((state)=>{
				if(isClean(state)){
					if(!R.contains(state.enPart.trim(),bufferTranslation)){
						bufferTranslation.push(state.enPart.trim())
						if(deWordFlag){
							deWordFlag = false
							deWord = state.dePart
						}
						enWord.push(state.enPart.trim())
					}
				}
			})
		}

		if(stateKey.includes("synonym")&&isClean(stateValue)&&!stateKey.includes("Fourth")){
			stateValue.map((state)=>{
				if(isClean(state)){
					if(!R.contains(state.dePart,bufferRelated)){
						bufferRelated.push(state.dePart)
						willReturnRelated.push({
							dePart: state.enPart,
							enPart: state.dePart
						})
					}
				}
			})
		}
		if(stateKey==="synonymFourth"&&isClean(stateValue)){
			stateValue.map((state)=>{
				if(isClean(state)){
					if(!R.contains(state.dePart,bufferRelatedSecond)){
						bufferRelatedSecond.push(state.dePart)
						willReturnRelated.push({
							dePart: state.dePart,
							enPart: state.enPart
						})
					}
				}
			})
		}
		if(stateKey.includes("phrase")&&isClean(stateValue)){
			stateValue.map((state)=>{
				if(isClean(state)){
					if(!R.contains(state.dePart,bufferExamples)){
						bufferExamples.push(state.dePart)
						willReturnExamples.push({
							dePart: state.dePart,
							enPart: state.enPart
						})
					}
				}
			})
		}
	}
	willReturn.translation = [{dePart: deWord, enPart: R.join(", ", enWord)}]
	willReturn.related = sortByName(willReturnRelated)
	willReturn.examples = sortByName(willReturnExamples)
	return willReturn
}

function isClean(question){
	return !R.isEmpty(question)&&question!==null
}

module.exports.main = main
