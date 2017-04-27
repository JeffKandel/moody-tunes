import React, { Component } from 'react'

/* ----- COMPONENT ----- */

export default class NavBar extends Component {
  render() {
    return (
      <nav className="flexcontainer-horizontal">
        <h2 className="left">Tune / Mood</h2>
        <h4 className="center text-align-middle subnav">Visualizing the emotional arc of your favorite tunes</h4>
      </nav>
    )
  }
}
