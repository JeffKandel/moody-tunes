import React, { Component } from 'react'
import axios from 'axios'
// import querystring from 'querystring'

import { googleKey, spotifyClientId, spotifyRedirectURI, geniusClientId, geniusClientSecret, geniusRedirectURI, geniusClientAccessToken } from '../../../secrets.js'

/* ----- IMPORT SUBCOMPONENTS ----- */
import NavBar from './NavBar.js'
import Corpus from './Corpus'
import Visualizer from './Visualizer'
import Footer from './Footer.js'
// import Loading from './Loading.js'
import LoginSpotify from './LoginSpotify.js'
import LoginGenius from './LoginGenius.js'

/* ----- COMPONENT ----- */

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: {},
      isLoading: false,
      isLoggedIntoSpotify: false,
      currSong: '',
      currArtist: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.mapResToState = this.mapResToState.bind(this)
    this.parseSentences = this.parseSentences.bind(this)
    this.handleSpotifyLogin = this.handleSpotifyLogin.bind(this)
    this.getHashParams = this.getHashParams.bind(this)
    this.generateRandomString = this.generateRandomString.bind(this)
    this.grabCurrentSong = this.grabCurrentSong.bind(this)
    this.grabSongLyrics = this.grabSongLyrics.bind(this)
  }
  render() {
    return (
      <div className="flexcontainer-vertical" id="appBlock">
        <NavBar />

        <div id="bodyBlock" className="row">
          <div className="col-md-4">
            {this.state.isLoggedIntoSpotify ?
              <Corpus handleSubmit={this.handleSubmit} />
              :
              <LoginSpotify handleSpotifyLogin={this.handleSpotifyLogin} />
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
    console.log(query)

    while (e = regQuery.exec(query)) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    console.log("hashParams", hashParams)
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
  grabCurrentSong(token) {
    if (token) {
      return axios.get('https://api.spotify.com/v1/me/player/currently-playing', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(res => {
          console.log(res)
          this.setState({
            isLoggedIntoSpotify: true,
            currSong: res.data.item.name,
            currArtist: res.data.item.artists[0] //TODO: write util converting an artist object with multiple artists into a flat array separated by spaces
          })
          this.grabSongLyrics()
        })
    } else {
      this.setState({
        isLoggedIntoSpotify: false
      })
    }
  }
  grabSongLyrics() {
    let url = 'https://api.genius.com/search'
    url += '?q=' + encodeURIComponent(this.state.currSong + ' ' + this.state.currArtist)
    return axios.get(url, {
      headers: { 'Authorization': 'Bearer ' + geniusClientAccessToken }
    })
      .then(res => {
        console.log(res)
      })
  }
  handleSpotifyLogin(evt) {
    evt.preventDefault()
    const newKey = this.generateRandomString(16)
    console.log("newKey - spotify", newKey)
    //state is not being set here
    window.localStorage['spotifyAuthKey'] = newKey
    console.log("localStorage['spotifyAuthKey']", localStorage['spotifyAuthKey'])
    let url = 'https://accounts.spotify.com/authorize'
    url += '?response_type=token'
    url += '&client_id=' + encodeURIComponent(spotifyClientId)
    url += '&scope=' + encodeURIComponent('user-read-currently-playing')
    url += '&redirect_uri=' + encodeURIComponent(spotifyRedirectURI)
    url += '&state=' + encodeURIComponent(localStorage['spotifyAuthKey'])
    console.log("url", url)
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
