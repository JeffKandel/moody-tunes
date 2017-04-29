import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

/* ----- IMPORT COMPONENTS ----- */
import App from './components/App.js'
import NavBar from './components/NavBar.js'
import Footer from './components/Footer.js'

//load main css
import './public/stylesheets/index.scss'

/* ----- IMPORT STORE ----- */
import store from './store.js'

/* ----- RENDER TO DOM ----- */
ReactDOM.render(
  (<Provider store={store}>
    <div>
      <NavBar />
      <App />
      <Footer />
    </div>
  </Provider>),
  document.getElementById('root')
)

