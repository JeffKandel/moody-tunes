import React, { Component } from 'react'

/* ----- COMPONENT ----- */

export default class NavBar extends Component {
  render() {
    return (
      <nav className="flexcontainer">
        <h2 className="left">Tune / Mood</h2>
        <h4 className="right text-align-middle">Visualizing the emotional arc of your favorite tunes</h4>
      </nav>
    )
  }
}
