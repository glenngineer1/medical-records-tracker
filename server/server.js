'use strict'

const { json } = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/medicalrecordstracker'
const PORT = process.env.PORT || 3000

// middlewares
app.use(express.static('client'))
app.use(json())

app.get('/api/title', (req, res) =>
  res.json({ title: 'Medical Records Tracker' })
)

const Visit = mongoose.model('visit', {
  physicianName: String,
  type: String,
})

app.get('/api/visits', (req, res, err) =>
  Visit
    .find()
    .then(visits => res.json({ visits }))
    .catch(err)
)

app.post('/api/visits', (req, res, err) =>
  Visit
    .create(req.body)
    .then(visit => res.json(visit))
    .catch(err)
)

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () =>
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
)

