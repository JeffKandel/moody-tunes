import React, { Component } from 'react'

/* ----- COMPONENT ----- */

export default class NavBar extends Component {
  render() {
    return (
      <nav className="flexcontainer-horizontal">
        <h4 className="left">tune / mood</h4>
        <h4 className="right text-align-middle subnav">visualizing the emotional arc of your current Spotify jam</h4>
      </nav>
    )
  }
}
