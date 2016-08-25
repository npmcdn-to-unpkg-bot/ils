"use strict"
import React, { Component } from "react"
import R from "ramda"
import J from "../../../_inc/commonReact.js"

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            visibility: "hidden",
            paginationIndex: 0,
            paginationPerPageCount: 24
        }
    }
    static get defaultProps () {
        return {
            data: [{imageSrc:"", imageThumb:""}],
            handleClick: (e)=>{console.log("Please set handleClick handler", e)},
            emitter: (e)=>{console.log("Please set emitter handler")}
        }
    }
    componentDidMount() {
        let listener = (e)=>{
            if (e.key === "ArrowLeft") {
                this.props.emitter.emit("left")
            }
            if (e.key === "ArrowRight") {
                this.props.emitter.emit("right")
            }
            if (e.key === "Escape") {
                this.props.emitter.emit("esc")
            }
        }
        window.addEventListener("keyup", listener, false)
        this.props.emitter.on("left", ()=>{
            if ((this.state.paginationIndex - this.state.paginationPerPageCount) >= 0) {
                this.setState({
                    visibility:"hidden",
                    paginationIndex: this.state.paginationIndex - this.state.paginationPerPageCount
                })
            }
        })
        this.props.emitter.on("right", ()=>{
            if ((this.state.paginationIndex + this.state.paginationPerPageCount) < this.props.data.length) {
                this.setState({
                    visibility:"hidden",
                    paginationIndex: this.state.paginationIndex + this.state.paginationPerPageCount
                })
            }
        })
        this.props.emitter.on(",", ()=>{
            if ((this.state.paginationIndex - this.state.paginationPerPageCount) >= 0) {
                this.setState({
                    paginationIndex: this.state.paginationIndex - this.state.paginationPerPageCount
                })
            }
        })
        this.props.emitter.on(".", ()=>{
            if ((this.state.paginationIndex + this.state.paginationPerPageCount) < this.props.data.length) {
                this.setState({
                    paginationIndex: this.state.paginationIndex + this.state.paginationPerPageCount
                })
            }
        })
        this.props.emitter.on("esc", ()=>{
            window.removeEventListener("keyup", listener)
            J.emitter.emit("unmount")
        })
        this.props.emitter.on("search image visibility", ()=>{
            if (this.state.visibility === "visible") {
                this.setState({visibility:"hidden"})
            } else {
                this.setState({visibility:"visible"})
            }
        })
    }
    render () {
        let styleObj = {
            visibility: this.state.visibility
        }
        return (
    <div style={styleObj}>
        <div className="newEntry columns is-multiline">
            {this.props.data.map((val, index)=>{
                if (R.gt(index, this.state.paginationIndex) && R.lte(index, this.state.paginationIndex + this.state.paginationPerPageCount)) {
                    return <div key={J.randomSeed()} className="column is-2">
                        <img className="imageThumb" src={val.imageThumb} onClick={()=>{this.props.handleClick(val)}} /></div>
                }
            })}
        </div>
    </div>
    )}
}
module.exports.main = App
