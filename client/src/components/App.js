import React, { Component } from 'react'
import axios from 'axios'

import { googleKey } from '../../../secrets.js'

/* ----- IMPORT SUBCOMPONENTS ----- */
import NavBar from './NavBar.js'
import Corpus from './Corpus'
import Visualizer from './Visualizer'
import Footer from './Footer.js'

/* ----- COMPONENT ----- */

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.mapResToState = this.mapResToState.bind(this)
    this.parseSentences = this.parseSentences.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const postBody = {
      "document": {
        "content": evt.target.corpus.value,
        "language": "EN",
        "type": "PLAIN_TEXT"
      },
      "encodingType": "UTF8"
    }
    console.log(postBody)
    axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${googleKey}`, postBody)
      .then(res => {
        this.mapResToState(res.data)
      })
  }
  parseSentences(arr) {
    return arr.map(obj => {
      return {
        sentenceOffset: obj.text.beginOffset,
        sentiment: obj.sentiment.score
      }
    })
  }
  mapResToState(serverResponse) {
    this.setState({
      data: {
        documentSentiment: serverResponse.documentSentiment,
        sentences: this.parseSentences(serverResponse.sentences)
      }
    })
  }
  render() {
    return (
      <div className="flexcontainer-vertical" id="appBlock">
        <NavBar />
        <div id="bodyBlock" className="row">
          <div id="corpusBlock" className="col-md-4">
            <Corpus handleSubmit={this.handleSubmit} />
          </div>
          <div id="visualizerBlock" className="col-md-8">
            <Visualizer data={this.state.data} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
