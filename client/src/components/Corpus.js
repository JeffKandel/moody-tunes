import React, { Component } from 'react'

class Corpus extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {
    return (
      <div id="corpusBlock">
        <h3>
          You're listening to
        </h3>
        <h3>
          {this.props.currSong && this.props.currSong} by {this.props.currArtist && this.props.currArtist}
        </h3>
        <form>
          <textarea
            name="corpus"
            value={this.props.corpus && this.props.corpus}
          />
          <div className="buttonContainer">
            <button
              className="btn btn-success"
              onClick={this.handleSubmit}
            >
              Generate sentimentagram
            </button>
            <button
              className="btn btn-success"
              onClick={this.props.grabCurrentSong}
            >
              Grab my current song
            </button>
          </div>
        </form>
      </div>
    )
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const postBody = {
      "document": {
        "content": this.props.corpus,
        "language": "EN",
        "type": "PLAIN_TEXT"
      },
      "encodingType": "UTF8"
    }
    return this.props.queryCorpus(postBody)
  }
}

/* ----- IMPORT CONTAINER DEPENDENCIES ----- */

import { connect } from 'react-redux'
import { grabCurrSong, passCorpusToChart } from '../reducers'

/* ----- CONTAINER ----- */

const mapStateToProps = (store, ownProps) => {
  return {
    currSong: store.currSong,
    currArtist: store.currArtist,
    corpus: store.corpus
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  grabCurrentSong: () => {
    dispatch(grabCurrSong(ownProps.access))
  },
  queryCorpus: (body) => {
    dispatch(passCorpusToChart(body))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Corpus)
