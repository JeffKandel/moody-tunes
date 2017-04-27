import React, { Component } from 'react'

/* ----- IMPORT COMPONENTS ----- */
import Corpus from './Corpus'
import Visualizer from './Visualizer'

/* ----- COMPONENT ----- */

const App = () => (
  <div>
    <div className="col-md-6">
      <Corpus />
    </div>
    <div className="col-md-6">
      <Visualizer />
    </div>
  </div>
)

export default App

