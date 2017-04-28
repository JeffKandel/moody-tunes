const getLyrics = require('lyric-get').get
const router = require('express').Router()

router.get('/lyrics/:artist/:song', (req, res, next) => {
  getLyrics(req.params.artist, req.params.song, (err, r) => {
    console.log("r", r)
    if (err) return next(err)
    res.send({ lyric: r })
  })
})

router.use((req, res, next) => {
  const err = new Error('API Route not found!')
  err.status = 404
  next(err)
})

module.exports = router

