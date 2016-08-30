import {React} from "../../../_inc/commonReact.js"
let Component = React.Component
export default class Navigation extends Component {
    render () {
        return (
            <div className="columns is-mobile has-text-centered">
              <div className="column is-half is-offset-one-quarter has-text-centered">
                  <span className="is-text-centered navItem">
                          <a href="/"><img width="50vw" height="auto" src="images/logo.jpg" alt="logo" /></a>
                  </span>
              </div>
            </div>
        )
    }
}
