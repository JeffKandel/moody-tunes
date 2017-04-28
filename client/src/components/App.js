import React, { Component } from 'react'
import axios from 'axios'
// import querystring from 'querystring'

import { googleKey, spotifyClientId, spotifyRedirectURI } from '../../../secrets.js'

/* ----- IMPORT SUBCOMPONENTS ----- */
import NavBar from './NavBar.js'
import Corpus from './Corpus'
import Visualizer from './Visualizer'
import Footer from './Footer.js'
// import Loading from './Loading.js'
import Login from './Login.js'

/* ----- COMPONENT ----- */

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: {},
      isLoading: false,
      isLoggedIn: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.mapResToState = this.mapResToState.bind(this)
    this.parseSentences = this.parseSentences.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.getHashParams = this.getHashParams.bind(this)
    this.generateRandomString = this.generateRandomString.bind(this)
    this.grabCurrentSong = this.grabCurrentSong.bind(this)
  }
  render() {
    return (
      <div className="flexcontainer-vertical" id="appBlock">
        <NavBar />

        <div id="bodyBlock" className="row">
          <div className="col-md-4">
            {this.state.isLoggedIn ?
              <Corpus handleSubmit={this.handleSubmit} /> :
              <Login handleLogin={this.handleLogin} />
            }
          </div>
          <div className="col-md-8">
            <Visualizer data={this.state.data} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  getHashParams() {
    let hashParams = {},
      e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)

    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    return hashParams
  }
  generateRandomString(length) {
    let text = '',
        possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }
  componentDidMount() {
    const params = this.getHashParams(),
      access_token = params.access_token,
      state = params.state,
      storedState = this.state.state
    if (access_token && (state == null || state !== storedState)) {
      console.log('There was an error during authentication :(')
    } else {
      return this.grabCurrentSong(access_token)
    }
  }
  grabCurrentSong(token) {
    if (token) {
      axios.get('https://api.spotify.com/v1/me/player/currently-playing', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(res => {
          console.log(res)
          this.setState({
            isLoggedIn: true
          })
        })
    } else {
      this.setState({
        isLoggedIn: false
      })
    }
  }
  handleLogin(evt) {
    evt.preventDefault()
    const spotifyAuthKey = this.generateRandomString(16)
    this.setState({
      spotify_auth_key: spotifyAuthKey
    })
    let url = 'https://accounts.spotify.com/authorize'
    url += '?response_type=token'
    url += '&client_id=' + encodeURIComponent(spotifyClientId)
    url += '&scope=' + encodeURIComponent('user-read-currently-playing')
    url += '&redirect_uri=' + encodeURIComponent(spotifyRedirectURI)
    url += '&state=' + encodeURIComponent(this.state.spotifyAuthKey)
    window.location = url
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.setState({
      isLoading: true
    })
    const postBody = {
      "document": {
        "content": evt.target.corpus.value,
        "language": "EN",
        "type": "PLAIN_TEXT"
      },
      "encodingType": "UTF8"
    }
    axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${googleKey}`, postBody)
      .then(res => {
        this.mapResToState(res.data)
      })
  }
  parseSentences(arr) {
    return arr.map(obj => {
      return {
        x: obj.text.beginOffset,
        y: obj.sentiment.score,
        sentenceStub: obj.text.content ? obj.text.content.slice(0, 15) + '...' : 'No text'
      }
    })
  }
  mapResToState(serverResponse) {
    this.setState({
      data: {
        documentSentiment: serverResponse.documentSentiment,
        sentences: this.parseSentences(serverResponse.sentences)
      },
      isLoading: false
    })
  }
}
