import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <button
          id="login-button"
          className="btn btn-primary"
          onClick={this.props.handleSpotifyLogin}
        >
          Log in with Spotify
        </button>
      </div>
    )
  }
}
