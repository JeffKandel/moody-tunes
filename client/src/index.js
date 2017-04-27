import React from 'react'
import ReactDOM from 'react-dom'

/* ----- IMPORT COMPONENTS ----- */
import App from './components/App.js'

//load main css
import './public/stylesheets/index.scss'

/* ----- DUMMY DATA ----- */
const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
]

/* ----- RENDER TO DOM ----- */
ReactDOM.render(
  <App data={data} />,
  document.getElementById('root')
)
