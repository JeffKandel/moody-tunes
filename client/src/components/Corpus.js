import React, { Component } from 'react'

export default class Corpus extends Component {
  render() {
    return (
      <div id="corpusBlock">
        <h3>
          You're listening to
        </h3>
        <h3>
          {this.props.currSong} by {this.props.currArtist}
        </h3>
        <form
          onSubmit={this.props.handleSubmit}
        >
          <textarea
            name="corpus"
            value={this.props.corpus && this.props.corpus}
          />
          <div>
            <button
              className="btn btn-success"
            >
              Generate sentimentagram
            </button>
          </div>
        </form>
      </div>
    )
  }
}
