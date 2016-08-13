"use strict"
import React, { Component } from "react"
import Select from "react-select"
import J from "./commonReact"
class Navigation extends Component {
    render () {
        return (
            <div className="columns is-mobile has-text-centered">
              <div className="column is-half is-offset-one-quarter has-text-centered">
                  <span className="is-text-centered navItem">
                          <a href="/"><img width="50vw" height="auto" src={`${J.ils}/images/logo.jpg`} alt="logo" /></a>
                  </span>
              </div>
            </div>
        )
    }
}
module.exports = Navigation
