// Libraries
const { dayjs } = require("../lib/dayjs")

const runFormat = (value) => {
  // Check if variable is string
  if (typeof value === "string" || value instanceof String) {
    // Remove all middle dash
    value = value.replace(/\-/g, "")
    // Remove all dots
    value = value.replace(/\./g, "")
    // Remove spaces
    value = value.replace(/\s/g, "")
    // Save rut
    const rutBody = value.slice(0, -1)
    // Save Digit
    const rutDigit = value.slice(-1)
    // Put dots every three numbers
    let formatRut = ""
    for (let i = rutBody.length; i > 0; i--) {
      const e = rutBody.charAt(i - 1)
      formatRut = e.concat(formatRut)
      if (i % 3 === 0) {
        formatRut = ".".concat(formatRut)
      }
    }
    return formatRut + "-" + rutDigit
  } else return null
}

const emailFormat = (value) => {
  // Check if variable is string
  if (typeof value === "string" || value instanceof String) {
    return value.trim().toLowerCase()
  } else return null
}

// 2023-03-21T13:05:50-03:00
const dateFormat = (value, format = "YYYY-MM-DDTHH:mm:ssZ", timezone = "America/Santiago") => {
  if (dayjs(value).isValid()) return dayjs(value).tz(timezone).format(format)
  else return value
}

const namesFormat = (value) => value.trim().replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())

const currencyFormat = (value, format = "en-US", style = "currency", currency = "USD", minimumFractionDigits = 0, maximumFractionDigits = 0) => {
  if (isNaN(value)) return null
  const formatter = new Intl.NumberFormat(format, {
    style,
    currency,
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits, // (causes 2500.99 to be printed as $2,501)
  })
  return formatter.format(value)
}

const jsonParse = (value) => {
  try {
    if (typeof value === "string" || value instanceof String) value = JSON.parse(value)
    return value
  } catch (error) {
    return value
  }
}

const getRandomInt = (max) => Math.floor(Math.random() * max)

module.exports = {
  runFormat,
  emailFormat,
  dateFormat,
  namesFormat,
  currencyFormat,
  jsonParse,
  getRandomInt,
}