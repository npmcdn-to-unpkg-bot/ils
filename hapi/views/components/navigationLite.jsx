import React, { Component } from "react"

export default class Navigation extends Component {
    render () {
        let logoStyle = {
            height: "53px"
        }
        return (
        <div className="columns is-mobile has-text-centered">
            <div className="column is-half is-offset-one-quarter has-text-centered">
                <span className="is-text-centered navItem">
                    <a href="/"><img width="53px" height="53px" src="logo.jpg" alt="logo" /></a>
                </span>
            </div>
        </div>
        )
    }
}
