import React, { Component } from 'react'

class Corpus extends Component {
  constructor() {
    super()
    this.generateGram = this.generateGram.bind(this)
  }
  render() {
    return (
      <div id="corpusBlock">
        <h6>
          you're listening to:
        </h6>
        <h4>
          {this.props.currSong ? this.props.currSong : 'TBD'} by {this.props.currArtist ? this.props.currArtist : 'TBD'}
        </h4>
        <div className="buttonContainer">
          <button
            className="btn btn-success"
            onClick={this.props.grabCurrentSong}
          >
            Grab my current song
        </button>
        </div>
        <textarea
          name="corpus"
          value={this.props.corpus && this.props.corpus}
        />
        <div className="buttonContainer">
          <button
            className="btn btn-success"
            onClick={this.generateGram}
          >
            Generate sentimentagram
            </button>
        </div>
      </div>
    )
  }
  generateGram(evt) {
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
  grabCurrentSong: (evt) => {
    evt.preventDefault()
    dispatch(grabCurrSong(ownProps.access))
  },
  queryCorpus: (body) => {
    dispatch(passCorpusToChart(body))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Corpus)
