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

const Register = mongoose.model('register', {
  name: {
    first: String,
    middle: String,
    last: String,
  },
  dob: Date,
  gender: String,
  weight: Number,
  height: {
    foot: Number,
    inches: Number,
  },
  bp: {
    systolic: Number,
    diastolic: Number,
  },
})

app.get('/api/registers', (req, res, err) =>
  Register
    .find()
    .then(registers => res.json({ registers }))
    .catch(err)
)

app.post('/api/registers', (req, res, err) =>
  Register
    .create(req.body)
    .then(register => res.json(register))
    .catch(err)
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

