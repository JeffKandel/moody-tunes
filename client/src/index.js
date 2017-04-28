import React from 'react'
import ReactDOM from 'react-dom'

/* ----- IMPORT COMPONENTS ----- */
import App from './components/App.js'

//load main css
import './public/stylesheets/index.scss'

/* ----- RENDER TO DOM ----- */
ReactDOM.render(
  <App />,
  document.getElementById('root')
)

