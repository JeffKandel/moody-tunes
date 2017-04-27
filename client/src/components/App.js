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
      <div className="flexcontainer-vertical" id="appBlock">
        <NavBar />
        <div id="bodyBlock" className="row">
          <div id="corpusBlock" className="col-md-4">
            Corpus will eventually go here
          </div>
          <div id="visualizerBlock" className="col-md-8">
            <Visualizer data={this.props.data} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
