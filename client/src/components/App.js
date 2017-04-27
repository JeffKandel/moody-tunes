import React, { Component } from 'react'

/* ----- IMPORT SUBCOMPONENTS ----- */
import Corpus from './Corpus'
import Visualizer from './Visualizer'

/* ----- COMPONENT ----- */

export default class App extends Component {
  render() {
    return (
      <div id="body" className="row">
        <div className="col-md-6">
          Corpus will eventually go here
        </div>
        <div className="col-md-6">
          <Visualizer data={this.props.data} />
        </div>
      </div>
    )
  }
}
