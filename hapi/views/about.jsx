"use strict"
import {React} from "../../_inc/commonReact.js"
let Component = React.Component
let DefaultLayout = require("./base/basic.jsx")
class About extends Component {
    render() {
        let imageStyle = {
            width: "30vw"
        }
        return (
            <div className="columns">
                 <div className="column is-10 is-offset-1">
                      <div className="content">
                          <p></p>
                          <h1>Welcome to my project - i learn smarter</h1>
                          <p>My name is Dejan Toteff and this is my personal educational project.</p>
                          <p>I am 34 years old Bulgarian, who lives currently in Ruse, Bulgaria.</p>
                          <p>This project won't exist if it wasn't for the Node.js/Javascript society in Hamburg, Germany.
                              They helped me out to overcome my initial struggles with the language, for which I am very grateful.</p>
                          <h2>The Idea</h2>
                          <p>
                              While I was in Germany, I was learning Javascript and German at the same time. While for Javascript I found the
                              right learning tools and made satisfactory progress, it was not the same in regards to the German.
                          </p>
                          <p>
                              There are some nice applications, but they are simply not good enough. The goal of an educational tool must be to allow the students to improve fast, instead of creating the illusion of progress.
                          </p>
                          <p>
                              While it could be easy to define the problem, the actual solution is not that obvious.
                          </p>
                          <div>
                              In the common case, such application are build by a team of teachers, designers, developers and managers. The communication between the different layers in such team is always a challange. Even if this challange is passed, there are still many other issues such as:
                              <ul>
                                  <li>Speed of development</li>
                                  <li>Speed of the front end</li>
                                  <li>Proper end to end and unit testing</li>
                                  <li>Marketing expenses</li>
                                  <li>Monetization</li>
                              </ul>
                          </div>
                          <h2>How this project handles those issues?</h2>
                          <h4>- Speed of development?</h4>
                          <p>As this is a personal project, I don't have communicational layers, I don't have fixed deadlines and I can choose my own technology stack. All that really helps me to write code faster.</p>
                          <h4>- Speed of the front end</h4>
                          <p>React.js takes care for that; my only task was to fall in love with the technology.</p>
                          <h4>- Proper end to end and unit testing</h4>
                          <p>Testing is always an issue, so I won't claim that I am doing much better in this regard. What is worth mentioning is that I export some part of the code as NPM libraries, so I can use Travis's cron jobs to ensure the stability of the system.</p>
                          <h4>- Marketing expenses</h4>
                              <p>As a former SEO, I am aware of the power of content marketing. This doesn't require any financial investment, only spending a little time in writing niche articles.</p>
                            <h4>- Monetization</h4>
                        <p>This project is not made for profit, so I am independent in this regard.</p>
                        <h2>Final words</h2>
                        <p>I wish if I could expand "ilearnsmarter.com" to assist in learning other languages besides German, but for the time being it is as it is.</p>
                    <p>I'd love to hear you positive or negative feedback. You can find me at Twitter as @self_refactor</p>
                    <p className="has-text-centered"><img style={imageStyle} src="images/dejanToteff.jpg"/></p>
                     </div>
                      </div>
                  </div>
        )
    }
}
let App = React.createClass({
    render: function() {
        return <DefaultLayout><About /></DefaultLayout>
    }
})
module.exports = App
