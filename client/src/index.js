import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

/* ----- REDUX STORE ----- */
import store from './store.js'

/* ----- COMPONENTS ----- */
import NavBar from './components/NavBar.js'
import App from './components/App.js'
import Footer from './components/Footer.js'

//load main css
import './public/stylesheets/index.scss'

ReactDOM.render(
  (<Provider store={store} >
    <NavBar />
    <App />
    <Footer />
  </Provider>),
  document.getElementById('app'))
