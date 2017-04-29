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
        <form>
          <textarea
            name="corpus"
            value={this.props.corpus && this.props.corpus}
          />
          <div className="buttonContainer">
            <button
              className="btn btn-success"
              onClick={this.props.generateGram}
            >
              Generate sentimentagram
            </button>
            <button
              className="btn btn-success"
              onClick={this.props.grabNewSong}
            >
              Grab my new song
            </button>
          </div>
        </form>
      </div>
    )
  }
}
