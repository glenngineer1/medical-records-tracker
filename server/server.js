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

const HTML5_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

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
  bloodType: String,
  medicalAllergies: Array,
  currentMedications: Array,
  currentIllnesses: Array,
  previousIllnesses: Array,
  familyHistory: Array,
  registrationDate: Date,
  pharmacy: {
    name: String,
    address: String,
    pharmacyPhone: String
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: [HTML5_EMAIL_REGEX, 'Please enter a valid email address'],
    index: { unique: true }
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
  visits: [mongoose.Schema.Types.ObjectId]
})

app.get('/api/registers', (req, res, err) =>
  Register
    .find()
    .then(registers => res.json({ registers }))
    .catch(err)
)

app.post('/api/registers', (req, res, err) => {
  const newRegisterObj = req.body
  Register
    .create(newRegisterObj)
    .then(response => {res.json(response)
    })
    .catch(err)
})

const Visit = mongoose.model('visit', {
  physicianName: String,
  type: String,
  contactInfo: {
    phone: String,
    address: String,
    email: String
  },
  weight: Number,
  height: {
    foot: Number,
    inches: Number,
  },
  bp: {
    systolic: Number,
    diastolic: Number,
  },
  reasonForVisit: String,
  date: Date,
  diagnosis: String,
  solution: String,
  followUp: String,
  bloodwork: String,
  medicationsPrescribed: Array,
  sideEffects: Array,
  allergies: Array,
  afterCare: String,
  userID: String,
})

app.get('/api/visits', (req, res, err) =>
  Visit
    .find()
    .then(visits => res.json({ visits }))
    .catch(err)
)

app.post('/api/visits', (req, res, err) => {
  const newVisitObj = req.body
  Visit
    .create(newVisitObj)
    .then(response => {
      Register.findOneAndUpdate({ email: newVisitObj.userID }, { $push: {"visits": response}})
      .then((data) => {
        res.json({ data })
      })
      .catch(err)
    })
    .catch(err)
})

app.post('/api/login', (req, res, err) => {
  const loginObj = req.body
  Register
    .findOne({ email: loginObj.email })
    .then(response => {
      if (response.password === loginObj.password) {
        res.status(201).json({ user: response, message: "Successful Login!" })
      } else {
        res.json({message: "Email and password don't match"})
      }
    })
    .catch(err)
})

app.post('/api/getvisits', (req, res, err) => {
  Visit
    .find({ userID: req.body.userID })
    .then(response => {
      res.json({ visits: response })
    })
    .catch(err)
})

app.post('/api/getindividualvisit', (req, res, err) => {
  Visit
    .findOne({ _id: req.body.id })
    .then(response => {
      res.json({ visit: response })
    })
    .catch(err)
})

// Update Individual Visit
app.post('/api/updatevisit', (req, res, err) => {
  const newVisitObj = req.body
  Visit
    .findOneAndUpdate(
      { _id: req.body.id },
      newVisitObj,
      { new: true }
      )
    .then(response => {
      res.json({ updatedIndividualVisit: response })
    })
    .catch(err)
})

// Delete Individual Visit
app.post('/api/deletevisit', (req, res, err) => {
  Visit
    .remove({ _id: req.body.id })
    .then(response => {
      res.json({ deleted: true })
    })
    .catch(err)
})

app.use('/api', (req, res) =>
  res.status(404).send({ code: 404, status: "Not Found" })
)
app.use((err, req, res, next) =>
  res.status(500).send({ code: 500, status: "Internal Server Error", detail: err.stack})
)

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () =>
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
)

