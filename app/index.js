// Libraries
require("dotenv").config()

// Components
const app = require("./security")

// Env constants
const API_VERSION = process.env.API_VERSION

// Routes
const mailRoutes = require("../routes/mail")

app.use(`/api/${API_VERSION}`, mailRoutes)

module.exports = app