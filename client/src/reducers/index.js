import axios from 'axios'

import { googleKey } from '../../../secrets.js'


/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT = 'SET_CURRENT'
const SET_TOKEN = 'SET_TOKEN'
const SET_CORPUS = 'SET_CORPUS'
const SET_CHART_DATA = 'SET_CHART_DATA'


/* ------------   ACTION CREATORS     ------------------ */

const setCurr = (artist, song) => {
  song = song.indexOf(' - ') > -1 ?
         song.slice(0, song.indexOf(' - ')) :
         song
  return {
    type: SET_CURRENT,
    artist,
    song
  }
}

const setToken = token => ({ type: SET_TOKEN, token })

const setCorpus = corpus => {
  corpus = corpus.replace(/\n\n/g, '\n')
    .replace(/\n/g, '.\n')
  return {
    type: SET_CORPUS,
    corpus
  }
}

const parseSentences = arr => {
  return arr.map(obj => {
    return {
      x: obj.text.beginOffset,
      y: obj.sentiment.score,
      sentenceStub: obj.text.content ? obj.text.content.slice(0, 15) + '...' : 'No text'
    }
  })
}

const setChartData = serverResponse => {
  return {
    type: SET_CHART_DATA,
    data: {
      documentSentiment: serverResponse.documentSentiment,
      sentences: parseSentences(serverResponse.sentences)
    }
  }
}

/* ------------       REDUCER     ------------------ */

export default (state = {
  data: {},
  isLoading: false,
  isLoggedIntoSpotify: false,
  currSong: '',
  currArtist: '',
  corpus: '',
  access_token: ''
}, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case SET_CURRENT:
      newState.currSong = action.song
      newState.currArtist = action.artist
      break

    case SET_TOKEN:
      newState.isLoggedIntoSpotify = true
      newState.access_token = action.token
      break

    case SET_CORPUS:
      newState.corpus = action.corpus
      break

    case SET_CHART_DATA:
      newState.data = action.data
      break

    default:
      return state
  }
  return newState
}

/* ------------       DISPATCHERS     ------------------ */

export const storeToken = token => (dispatch, getState) => {
  return dispatch(setToken(token))
}

export const grabLyrics = () => (dispatch, getState) => {
  return axios.get(`/api/lyrics/${encodeURIComponent(getState().currArtist)}/${encodeURIComponent(getState().currSong)}`)
    .then(res => {
      dispatch(setCorpus(res.data.lyric))
    })
    .catch(err => {
      dispatch(setCorpus('Too hip for my blood -- your song isn\'t in my lyrics database. Try something a little more mainstream?'))
    })
}

export const grabCurrSong = token => (dispatch, getState) => {
  console.log("Got to grabCurrSong in reducer with token: ", token)
  return axios.get('https://api.spotify.com/v1/me/player/currently-playing', { headers: { 'Authorization': 'Bearer ' + token } })
    .then(res => {
      console.log('currplaying api response', res)
      const apiArtist = res.data.item.artists[0].name,
            apiSong = res.data.item.name
      if (apiArtist !== getState().currArtist || apiSong !== getState().currSong) {
        dispatch(setCurr(apiArtist, apiSong))
        dispatch(grabLyrics())
      } else {
        console.log('No new song')
      }
    })
}

export const passCorpusToChart = body => (dispatch, getState) => {
  return axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${googleKey}`, body)
    .then(res => {
      dispatch(setChartData(res.data))
    })
}
