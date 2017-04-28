import barackSpeech from './fakeData/barackSpeech.js'
import kendrickPoeticJustice from './fakeData/kendrickPoeticJustice.js'
import kendrickSwimmingPools from './fakeData/kendrickSwimmingPools.js'

const genData = (arr) => {
  return arr.map(obj => {
    return {
      sentenceOffset: obj.text.beginOffset,
      sentiment: obj.sentiment.score
    }
  })
}

export const dataObj = (function(obj) {
  return {
    documentSentiment: obj.documentSentiment,
    sentences: genData(obj.sentences)
  }
})(kendrickPoeticJustice)
