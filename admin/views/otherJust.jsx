"use strict"
import React, { Component } from 'react'
var DefaultLayout = require('./default.jsx')

class IndexContainer extends Component {
    render() {
        return (
            <div className="columns">
                 <div className="column is-10 is-offset-1">
                      <div className="content">
                          <p></p>
                          <h1>Learn German Language</h1>
                          <p>The Germans has the saying that life is too short for a man to learn proper German.
                              While I somehow agree with it, I think that the main reason is the lack of proper tooling.</p>
                          <p>Private lessons, educational courses, online courses, language partner exchange, all those practices are considered useful. I won't debate over their usefulness, but I claim that all off them are very slow, compared to what actually can be build today</p>
                          <h2>Applications</h2>
                          <ol>
                              <li><a href="/learningMeme">Learning Meme</a> - A word with related image and related translated sentence are displayed. The aim is to find the hidder word.</li>
                              <li><a href="/einEine">EinEine</a> - Select the right German article form. It is working with both indefinite and definite articles.</li>
                              <li><a href="/orderTheSentence">Order German Sentences</a> - The user see the words of a German sentence in random order. The goal is to order the words, so at the end the correct sentence is displayed.</li>
                              <li><a href="/guessTheWord">Guess The Word</a> - The user must write the hidden word. As clues are displayed related words and example sentences.</li>
                          </ol>
                          <h3>About</h3>
                          <p>This is project developed solely by Dejan Toteff. You can reach me out at Twitter @self_refactor in case you have some feedback or questions aboout this project.</p>
                          <h4>The Stack</h4>
                          <p>Nodejs, React, Bulma, Firebase, Babel, Express</p>
                          <p>I need to mention also Ubuntu 15 Desktop Edition, as it brings such order in the dev process</p>
                      </div>
                  </div>
            </div>
        )
      }
}

var HelloMessage = React.createClass({
  render: function() {
    return <DefaultLayout keyword="more">
        <IndexContainer />
        Hello me
    </DefaultLayout>;
  }
});

module.exports = HelloMessage;
