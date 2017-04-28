import React, { Component } from 'react'

export default class Corpus extends Component {
  render() {
    return (
      <div id="corpusBlock">
        <h3>
          You're listening to {this.props.currSong} by {this.props.currArtist}
          </h3>
        <form
          onSubmit={this.props.handleSubmit}
        >
          <textarea
            name="corpus"
            value={this.props.corpus && this.props.corpus}
          />
          <div>
            <button>Generate sentimentagram</button>
          </div>
        </form>
      </div>
    )
  }
}
