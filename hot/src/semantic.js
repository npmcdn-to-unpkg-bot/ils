"use strict"
import React, { Component } from "react"
import R from "ramda"
import J from "./components/commonReact.js"
var db = new Dexie("friend_database");
          db.version(1).stores({
              friends: 'name,shoeSize'
          });
          
          //
          // Open it
          //
          db.open().catch(function (e) {
              alert ("Open failed: " + e);
          });

          //
          // Put some data into it
          //
          db.friends.put({name: "Nicolas", shoeSize: 8}).then (function(){
              //
              // Then when data is stored, read from it
              //
              return db.friends.get('Nicolas');
          }).then(function (friend) {
              //
              // Display the result
              //
              alert ("Nicolas has shoe size " + friend.shoeSize);
          }).catch(function(error) {
             //
             // Finally don't forget to catch any error
             // that could have happened anywhere in the
             // code blocks above.
             //
             alert ("Ooops: " + error);
          });
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }
    static get defaultProps () {
        return {
            "message": "dummy"
        }
    }
    componentDidMount() {
    }
    handleClick (event) {
    }
    render () {
        return (
        <div>
            <div className="ui steps">
                <a className="active step">
                    <i className="truck icon"></i>
                    <div className="content">
                        <div className="title">Shipping</div>
                        <div className="description">Choose your shipping options</div>
                        </div>
                </a>
                <a className="step">
                    <div className="content">
                        <div className="title">Billing</div>
                        <div className="description">Enter billing information</div>
                        </div>
                </a>
            </div>
        </div>
        )}
    }
