import React from 'react'
import ReactDOM from 'react-dom'

/* ----- IMPORT COMPONENTS ----- */
import App from './components/App.js'

//load main css
import './public/stylesheets/index.scss'

/* ----- DUMMY DATA ----- */
import {dataObj} from './fakeDataState.js'

/* ----- RENDER TO DOM ----- */
ReactDOM.render(
  <App data={dataObj} />,
  document.getElementById('root')
)

