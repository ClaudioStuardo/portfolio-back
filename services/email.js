// Libraries
require("dotenv").config()
const nodemailer = require("nodemailer")

// Env constants
const senderEmail = process.env.EMAIL
const senderPassword = process.env.PASSWORD_EMAIL
const senderName = "Claudio Stuardo"

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

// Send one email
const sendEmail = async (options) => {
  return new Promise((resolve) => {
    const mailOptions = {
      from: `${senderName} <${senderEmail}>`,
      to: options.email,
      subject: options.subject,
      text: options.subject,
      html: options.html,
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) resolve(false)
      resolve(true)
    })
  })
}

// Send one email to multiples receivers
const sendEmailToMultiplesReceivers = async (options) => {
  return new Promise((resolve) => {
    const receivers = []
    if (options.emails && Array.isArray(options.emails)) {
      options.emails.forEach((element) => {
        if (element.email) receivers.push(element.email)
      })
    }
    if (!receivers.length) resolve(false)
    const mailOptions = {
      from: `${senderName} <${senderEmail}>`,
      to: receivers,
      subject: options.subject,
      text: options.subject,
      html: options.html,
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) resolve(false)
      resolve(true)
    })
  })
}

module.exports = {
  sendEmail,
  sendEmailToMultiplesReceivers,
}