// Services
const { sendEmail } = require("../services/email")

// Utils
const { fieldsValidations } = require("../utils/validation")
const { emailFormat, namesFormat } = require("../utils/formats")
const { contact } = require("../utils/emailTemplate")

// *************************
// |       FUNCTIONS       |
// *************************
// #region functions
const sendNotification = async (req, res) => {
  try {
    let { name, email, subject, message } = req.body;
    // Fields validation
    let validations = {
      string: [{ name }, { email }, { subject }, { message }],
    };
    const resp = fieldsValidations(validations);
    if (resp.ok && resp.message) return res.status(404).json({ ok: false, msg: resp.message });

    name = namesFormat(name);
    email = emailFormat(email);

    const emailOptions = {
      email: 'claudio.stuardo96@gmail.com',
      subject: "Se ha solicitado contacto por la web de tu portafolio",
      html: contact(name, email, subject, message),
    };
    await sendEmail(emailOptions);

    return res.status(201).json({ ok: true, msg: "Form submitted successfully" })
  } catch (error) {
    return res.status(500).json({ ok: false, msg: error.message });
  }
}
// #endregion

module.exports = {
  sendNotification,
}