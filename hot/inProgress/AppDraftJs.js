"use strict"
import React,{ Component } from "react"
import {Editor,EditorState,RichUtils} from "draft-js"
import * as R from "ramda"
import reqwest from "reqwest"
import ramjet from "ramjet"


let emitter = new Events()
let initOnce = R.once( ()=>{
    emitter.emit( "init" )
} )

const winWidthIs = window.innerWidth * 1
const winHeightIs = window.innerHeight * 1

const singleWidth = Math.floor( winWidthIs / 100 )
const fontSizeIs = Math.floor( singleWidth * 2.5 )
const singleHeight = Math.floor( winHeightIs / 100 )

const outerHalf = Math.floor( winWidthIs / 2 )
const outerQuorter = Math.floor( winWidthIs / 4 )

function shuffle( arr ) {
    let i,j,temp
    for ( i = arr.length - 1; i > 0; i-- ) {
        j = Math.floor( Math.random() * ( i + 1 ) )
        temp = arr[ i ]
        arr[ i ] = arr[ j ]
        arr[ j ] = temp
    }
    return arr
}

export default class App extends Component {
    constructor ( props ) {
        super( props )
        this.state = {
            editorState: EditorState.createEmpty(),
            keyword: ""
        }
        this.handleKeyCommand = this.handleKeyCommand.bind( this )
        this.willHandleDraft = this.willHandleDraft.bind( this )
        this.keywordFn = this.keywordFn.bind( this )
        this.publish = this.publish.bind( this )
    }
    static get defaultProps () {
        return {
            "message": "dummy message"
        }
    }
    keywordFn( event ) {
        this.setState( {
            keyword: `${this.state.keyword}${event.key}`
        } )
    }
    publish() {
        let url = "http://localhost:3001/blog"
        let willPost = {
            keyword: this.state.keyword,
            content: this.state.editorState.getCurrentContent().getPlainText()
        }
        posting( url,willPost ).then( console.log )
    }
    componentDidMount() {
        emitter.on( "init",()=>{

        } )
        initOnce()
    }
    willHandleDraft ( editorState ) {
        console.log( this.state.editorState.getCurrentContent().getPlainText() )
        this.setState( {editorState} )
    }
    handleKeyCommand( command ) {
        const newState = RichUtils.handleKeyCommand( this.state.editorState,command )
        if ( newState ) {
            this.onChange( newState )
            return true
        }
        return false
    }

    render () {
        const {editorState} = this.state
        return (
<div>
    <div className="onlyContainer">
        <div className="columns box">
            <div className="column is-half is-offset-one-quarter has-text-centered" >
                <Editor editorState={editorState} value={this.state.title} onChange={this.willHandleDraft} handleKeyCommand={this.handleKeyCommand} placeholder="Enter some text..." />
            </div>
        </div>
	</div>

    <div className="onlyContainer">
        <div className="columns box">
            <div className="column is-half is-offset-one-quarter has-text-centered" >
                <input type="text" onKeyPress={this.keywordFn} />
                <hr/>
                <a className="button is-primary" onClick={this.publish} >test</a>
            </div>
        </div>
	</div>
</div>
    )}
}

function posting ( url,data ) {
    return new Promise( ( resolve )=>{
        reqwest( {
            url:     url,
            method:  "post",
            data:    data,
            error: function ( err ) { console.log( err )},
            success: function ( resp ) {
                resolve( resp )
            }
        } )
    } )
}


function Events( target ) {
    let events = {},empty = []
    target = target || this
    target.on = function( type,func,ctx ) {
        ( events[ type ] = events[ type ] || [] ).push( [func,ctx] )
    }
    target.off = function( type,func ) {
        type || ( events = {} )
        var list = events[ type ] || empty,
            i = list.length = func ? list.length : 0
        while ( i-- ) func == list[ i ][ 0 ] && list.splice( i,1 )
    }
    target.emit = function( type ) {
        let e = events[ type ] || empty,list = e.length > 0 ? e.slice( 0,e.length ) : e,i = 0,j
        while ( j = list[ i++ ] ) j[ 0 ].apply( j[ 1 ],empty.slice.call( arguments,1 ) )
    }
}
