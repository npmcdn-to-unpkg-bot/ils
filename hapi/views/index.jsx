"use strict"
import React, { Component } from "react"
const DefaultLayout = require("./base/basic.jsx")

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
                              <li><a href="/learningMeme">Learning Meme</a> - Meme with hidden German word, its translation and example sentence is displayed. The aim is to write the hidden word.</li>
                              <li><a href="/learningMemeAutomated">Learning Meme Automated</a> - It is the demo version of the above application. It can be used to see how the original application works.  Or just use it to watch a never ending stream of learning memes.</li>
                              <li><a href="/writeSentence">Write German Sentence</a> - You will see an English sentence and you have to write its German translation. The system will wait for correct key to be pressed and won't proceed further till that happen. Of cource, the user can just press "Enter" to see the answer, if the question is that hard. As a clue, the user can see the beginning of each word.</li>
                              <li><a href="/writeSentenceLite">Write German Sentence Lite</a> - You will see an English sentence and you have to write its translation. On every wrong input, the correct word will be displayed, as opposite to keep exppecting the right input. As a clue, the user can see the beginning of each word.</li>
                              <li><a href="/orderSentence">Order German Sentences</a> - The user see the words of a German sentence in random order. The goal is to order the words, so at the end the correct sentence is displayed.</li>
                              <li><a href="/orderSentenceMobile">Order German Sentences Mobile</a> - Same as above, but optimized for mobile users, but all other users can use it as well.</li>
                          </ol>
                          <h3>About</h3>
                          <p>This is project developed solely by Dejan Toteff. You can reach me out at Twitter @self_refactor in case you have some feedback or questions aboout this project.</p>
                          <h4>The Stack</h4>
                          <p>Nodejs, Ramda, React, Bulma, Babel, Express</p>
                          <p>I need to mention also Ubuntu 16 Desktop Edition, as it brings such order in the dev process</p>
                      </div>
                  </div>
            </div>
        )
    }
}

let App = React.createClass({
    render: function() {
        return <DefaultLayout description="Node.js and React.js based application for learning German language"><IndexContainer/></DefaultLayout>
    }
})

module.exports = App
