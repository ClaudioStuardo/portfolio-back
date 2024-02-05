// Libraries
require("dotenv").config()
const toobusy = require("toobusy-js")
const hpp = require("hpp")
const helmet = require("helmet")
const noCache = require("nocache")
const hpkp = require("hpkp")
const csp = require("helmet-csp")
const expectCt = require("expect-ct")
const cors = require("cors")

// Middleware
const rateLimit = require("../middlewares/ratelimiter")

// Components
const app = require("./app")

// CORS
app.use(cors())

// Monitor the event loop
app.use(function (req, res, next) {
  if (toobusy()) {
    console.log("Server Too Busy")
    res.status(503).send("Server Too Busy")
  } else next()
})

// Prevent HTTP Parameter Pollution
app.use(hpp())

// Precautions against brute-forcing
app.use(rateLimit)

/*
 *
 * SECURITY HEADER
 */
// Strict-Transport-Security
app.use(helmet.hsts()) // default configuration
// X-Frame-Options
app.use(helmet.frameguard("sameorigin")) // SAMEORIGIN
// X-Content-Type-Options
app.use(helmet.noSniff())
// Content-Security-Policy
app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"], // default value for all directives that are absent
      scriptSrc: ["'self'"], // helps prevent XSS attacks
      frameAncestors: ["'none'"], // helps prevent Clickjacking attacks
      imgSrc: ["'self'", "'http://imgexample.com'"],
      styleSrc: ["'none'"],
    },
  })
)
// Cache-Control and Pragma
app.use(noCache())
// X-Download-Options
app.use(helmet.ieNoOpen())
// Expect-CT
app.use(expectCt({ enforce: true, maxAge: 123 }))
// Public-Key-Pins
app.use(
  hpkp({
    maxAge: 123,
    sha256s: ["Ab3Ef123=", "ZyxawuV45="],
    reportUri: "http://example.com",
    includeSubDomains: true,
  })
)
// X-Powered-By
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" })) // lie about the technologies used

module.exports = app