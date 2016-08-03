import React, { Component } from "react"

export default class Navigation extends Component {
    render () {
        return (
        <div className="columns is-mobile has-text-centered">
            <div className="column is-half is-offset-one-quarter has-text-centered">
                <span className="is-text-centered navItem">
                    <a href="/"><img width="10%" height="10%" src="logo.jpg" alt="logo" /></a>
                </span>
            </div>
        </div>
        )
    }
}
