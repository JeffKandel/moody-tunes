import React, { Component } from 'react'
import axios from 'axios'
// import querystring from 'querystring'

import { googleKey, spotifyClientId, spotifyRedirectURI } from '../../../secrets.js'

/* ----- IMPORT SUBCOMPONENTS ----- */
import Corpus from './Corpus'
import Visualizer from './Visualizer'
import LoginSpotify from './LoginSpotify.js'

/* ----- COMPONENT ----- */

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: {},
      isLoading: false,
      isLoggedIntoSpotify: false,
      currSong: '',
      currArtist: '',
      corpus: '',
      access_token: ''
    }
    /* ----- SPOTIFY LOGIN METHODS ----- */
    this.handleSpotifyLogin = this.handleSpotifyLogin.bind(this)
    this.getHashParams = this.getHashParams.bind(this)
    this.generateRandomString = this.generateRandomString.bind(this)

    /* ----- LYRIC GRABBER + PARSER METHODS ----- */
    this.grabCurrentSong = this.grabCurrentSong.bind(this)
    this.grabSongLyrics = this.grabSongLyrics.bind(this)
    this.parseCorpus = this.parseCorpus.bind(this)

    /* ----- SENTIMENTAGRAM GENERATOR METHODS ----- */
    this.handleSubmit = this.handleSubmit.bind(this)
    this.mapResToState = this.mapResToState.bind(this)
    this.parseSentences = this.parseSentences.bind(this)
  }
  render() {
    return (
      <div className="flexcontainer-vertical" id="appBlock">
        <div id="bodyBlock" className="row">
          <div className="col-md-4">
            {this.state.isLoggedIntoSpotify ?
              <Corpus
                generateGram={this.handleSubmit}
                grabNewSong={this.grabCurrentSong}
                corpus={this.state.corpus}
                currSong={this.state.currSong}
                currArtist={this.state.currArtist}
                access={this.state.access_token}
              />
              :
              <LoginSpotify handleSpotifyLogin={this.handleSpotifyLogin} />
            }
          </div>
          <div className="col-md-8">
            <Visualizer data={this.state.data} />
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    const params = this.getHashParams(),
      access_token = params.access_token,
      state = params.state,
      storedSpotifyState = window.localStorage['spotifyAuthKey']
    if (access_token && (state == null || state !== storedSpotifyState)) {
      console.log('There was an error during Spotify authentication :(')
    } else {
      return this.grabCurrentSong(access_token)
    }
  }
  getHashParams() {
    let hashParams = {},
      e,
      regQuery = /([^&;=]+)=?([^&;]*)/g,
      query = window.location.hash.substring(1)
    while (e = regQuery.exec(query)) {
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
  grabCurrentSong() {
    const args = [].slice.call(arguments)
    const token = args.length > 0 ? args[0] : this.state.access_token
    return axios.get('https://api.spotify.com/v1/me/player/currently-playing', { headers: { 'Authorization': 'Bearer ' + token } })
      .then(res => {
        this.setState({
          isLoggedIntoSpotify: true,
          currSong: res.data.item.name,
          currArtist: res.data.item.artists[0].name
        })
        this.grabSongLyrics()
      })
  }
  grabSongLyrics() {
    return axios.get(`/api/lyrics/${encodeURIComponent(this.state.currArtist)}/${encodeURIComponent(this.state.currSong)}`)
      .then(res => {
        this.parseCorpus(res.data.lyric)
      })
  }
  parseCorpus(corpus) {
    corpus = corpus.replace(/\n\n/g, '\n')
      .replace(/\n/g, '.\n')
    this.setState({
      corpus: corpus
    })
  }
  handleSpotifyLogin(evt) {
    evt.preventDefault()
    const newKey = this.generateRandomString(16)
    //state is not being set here
    window.localStorage['spotifyAuthKey'] = newKey
    let url = 'https://accounts.spotify.com/authorize'
    url += '?response_type=token'
    url += '&client_id=' + encodeURIComponent(spotifyClientId)
    url += '&scope=' + encodeURIComponent('user-read-currently-playing')
    url += '&redirect_uri=' + encodeURIComponent(spotifyRedirectURI)
    url += '&state=' + encodeURIComponent(localStorage['spotifyAuthKey'])
    window.location = url
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.setState({
      isLoading: true
    })
    const postBody = {
      "document": {
        "content": this.state.corpus,
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
