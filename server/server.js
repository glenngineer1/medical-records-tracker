'use strict'

const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// middlewares
app.use(express.static('client'))

// Listen to requests on the provided port and log when available
 app.listen(port, () => console.log(`Listening on port: ${port}`))

