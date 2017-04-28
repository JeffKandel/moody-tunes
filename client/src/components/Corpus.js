import React, { Component } from 'react'

export default class Corpus extends Component {
  render() {
    return (
      <div id="corpusBlock">
        <h3>
          Input corpus here
          </h3>
        <form
          onSubmit={this.props.handleSubmit}
        >
          <textarea
            name="corpus"
          />
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}
