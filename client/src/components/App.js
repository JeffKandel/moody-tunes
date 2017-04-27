import React, { Component } from 'react'

/* ----- IMPORT SUBCOMPONENTS ----- */
import NavBar from './NavBar.js'
import Corpus from './Corpus'
import Visualizer from './Visualizer'
import Footer from './Footer.js'

/* ----- COMPONENT ----- */

export default class App extends Component {
  render() {
    return (
      <div>
      <NavBar />
      <div id="body" className="row">
        <div className="col-md-6">
          Corpus will eventually go here
        </div>
        <div className="col-md-6">
          <Visualizer data={this.props.data} />
        </div>
      </div>
      <Footer />
      </div>
    )
  }
}
