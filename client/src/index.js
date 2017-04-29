import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';

/* ----- IMPORT COMPONENTS ----- */
import App from './components/App.js'
import NavBar from './components/NavBar.js'
import Footer from './components/Footer.js'

//load main css
import './public/stylesheets/index.scss'

/* ----- RENDER TO DOM ----- */
ReactDOM.render(
  (
    <div>
      <NavBar />
      <App />
      <Footer />
    </div>
  ),
  document.getElementById('root')
)

