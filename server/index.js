const path = require('path')
const express = require('express')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')

const PORT = 3000

const app = express()

//logging middleware
app.use(volleyball)

//body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log('Server listening on Port: ', PORT)
})

//redirect api routes
app.use('/api', require('./api'))

//set access control for incoming requests
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

app.use(express.static(path.join(__dirname, '..', 'client/src/public')))

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client/src/public/index.html'))
})

//Error Handler
app.use('/', (err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal Server error.')
})
