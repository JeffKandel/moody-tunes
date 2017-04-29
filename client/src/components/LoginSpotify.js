import React, { Component } from 'react'

import { spotifyClientId, spotifyRedirectURI } from '../../../secrets.js'

export default class LoginSpotify extends Component {
  constructor() {
    super()
    this.generateRandomString = this.generateRandomString.bind(this)
    this.handleSpotifyLogin = this.handleSpotifyLogin.bind(this)
  }
  render() {
    return (
      <div className="login">
        <div>
          <h3 className="text-center">Start</h3>
        </div>
        <div className="button-container center">
          <button
            id="login-button"
            className="btn btn-primary"
            onClick={this.handleSpotifyLogin}
          >
            Log in with Spotify
        </button>
        </div>
      </div>
    )
  }
  generateRandomString(length) {
    let text = '',
      possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }
  handleSpotifyLogin(evt) {
    evt.preventDefault()
    const newKey = this.generateRandomString(16)
    window.localStorage['spotifyAuthKey'] = newKey
    let url = 'https://accounts.spotify.com/authorize'
    url += '?response_type=token'
    url += '&client_id=' + encodeURIComponent(spotifyClientId)
    url += '&scope=' + encodeURIComponent('user-read-currently-playing')
    url += '&redirect_uri=' + encodeURIComponent(spotifyRedirectURI)
    url += '&state=' + encodeURIComponent(localStorage['spotifyAuthKey'])
    window.location = url
  }
}
