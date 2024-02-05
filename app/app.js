// Libraries
const express = require("express")
const bodyParser = require("body-parser")

// Express init
const app = express()

// Express configuration
app.use(bodyParser.urlencoded({ extended: true, limit: "2048kb" }))
app.use(bodyParser.json({ limit: "2048kb" }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH")
  res.header("Allow", "GET, POST, PUT, PATCH")
  next()
})

module.exports = app