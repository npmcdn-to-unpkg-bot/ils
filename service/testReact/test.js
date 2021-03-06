import { renderComponent, expect } from "./testHelp"
import App from "../../hot/src/test"

describe("App", () => {
    let component

    beforeEach(() => {
        component = renderComponent(App)
    })

    it("renders something", () => {
        expect(component).to.exist
    })
})
//mocha --compilers js:babel-core/register --require ./services/testReact/testHelp.js --recursive ./services/testReact
