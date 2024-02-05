const fieldsValidations = (fields) => {
  if (!fields) return
  const fieldsArr = []
  if (Array.isArray(fields.string)) {
    fields.string.forEach((el) => {
      if (typeof el !== "object") return { ok: false, message: "Invalid string format", err: el }
      const key = Object.keys(el)[0]
      if (typeof el[key] !== "string") fieldsArr.push(key)
      else if (!dataValidation(key, el[key])) fieldsArr.push(key)
    })
  }
  if (Array.isArray(fields.number)) {
    fields.number.forEach((el) => {
      if (typeof el !== "object") return { ok: false, message: "Invalid number format", err: el }
      const key = Object.keys(el)[0]
      if (isNotNumber(el[key]) || typeof el[key] !== "number") fieldsArr.push(key)
    })
  }
  if (Array.isArray(fields.boolean)) {
    fields.boolean.forEach((el) => {
      if (typeof el !== "object") return { ok: false, message: "Invalid boolean format", err: el }
      const key = Object.keys(el)[0]
      if (!isBoolean(el[key])) fieldsArr.push(key)
    })
  }
  if (Array.isArray(fields.object)) {
    fields.object.forEach((el) => {
      if (typeof el !== "object") return { ok: false, message: "Invalid object format", err: el }
      const key = Object.keys(el)[0]

      // Content isn't object
      if (typeof el[key] !== "object") fieldsArr.push(key)

      // Validate format
      if (Array.isArray(fields.format) && typeof el[key] === "object") {
        fields.format.forEach((formatItem) => {
          const formatKey = Object.keys(formatItem)[0]
          if (key === formatKey) {
            if (!objectsHaveSameKeysAndTypeof(el[key], formatItem[formatKey])) fieldsArr.push(key)
          }
        })
      }
    })
  }
  if (Array.isArray(fields.array)) {
    fields.array.forEach((el) => {
      if (typeof el !== "object") return { ok: false, message: "Invalid array format", err: el }
      const key = Object.keys(el)[0]

      // Content isn't array
      if (!Array.isArray(el[key])) fieldsArr.push(key)
      // if (!el[key].length) fieldsArr.push(key)

      // Validate format
      if (Array.isArray(fields.format) && Array.isArray(el[key])) {
        fields.format.forEach((formatItem) => {
          const formatKey = Object.keys(formatItem)[0]
          if (key === formatKey) {
            switch (typeof formatItem[formatKey]) {
              case "string":
                if (formatItem[formatKey] === "id") {
                  if (!arrayContainsOnlyIds(el[key])) fieldsArr.push(key)
                } else if (!arrayContainsOnlyStrings(el[key])) fieldsArr.push(key)
                break
              case "number":
                if (!arrayContainsOnlyNumbers(el[key])) fieldsArr.push(key)
                break
              case "object":
                let validFormat = true
                el[key].forEach((element) => {
                  if (!objectsHaveSameKeysAndTypeof(element, formatItem[formatKey]) && validFormat) validFormat = false
                })
                if (!validFormat) fieldsArr.push(key)
                break
              case "array":
                if (!arrayContainsOnlyArrays(el[key])) fieldsArr.push(key)
                break
              default:
                fieldsArr.push(key)
                break
            }
          }
        })
      }
    })
  }
  if (fieldsArr.length) {
    return { ok: true, message: fieldsArr.length > 1 ? `Los campos ${fieldsArr.join(", ")} no son válidos o no fueron enviados` : `El campo ${fieldsArr} no es válido o no fue enviado`, err: null }
  } else return { ok: true, message: null, err: null }
}

// ***********************
// |       STRINGS       |
// ***********************
// #region strings validations
const dataValidation = (key, value, minLenght = 2) => {
  key = key.toString().toLowerCase()
  if (key === "email") return emailValidation(value)
  else if (key === "rut" || key === "run") return runValidation(value)
  else if (key === "phone") return phoneValidation(value)
  else if (key === "password") return passwordValidation(value)
  else if (key === "username") return nameValidation(value)
  else if (key === "role" || key === "roles") return rolesValidation(value)
  else if (key === "ip") return ipValidation(value)
  else if (key.toString().toLowerCase().includes("slug")) return slugValidation(value)
  else if (key === "level") return levelValidation(value)
  else if (key === "link") return isValidUrl(value)
  else if (key === "wspNumber") return whatsAppNumberValidation(value)
  else if (key === "priority") return priorityValidation(value)
  else return minLengthValidation(value, minLenght)
}

const emailValidation = (value) => /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)

const runValidation = (rut) => {
  if (typeof rut === "string" || rut instanceof String) {
    rut = rut.replace(/\./g, "")
    rut = rut.replace(/\s/g, "")
    if (rut !== "" && rut.toString().indexOf("-") > 0) {
      const characters = []
      const serie = [2, 3, 4, 5, 6, 7]
      const dig = rut.toString().substr(rut.toString().length - 1, 1)
      rut = rut.toString().substr(0, rut.toString().length - 2)
      for (let i = 0; i < rut.length; i++) characters[i] = parseInt(rut.charAt(rut.length - (i + 1)))
      let summation = 0,
        k = 0,
        rest = 0
      for (let j = 0; j < characters.length; j++) {
        if (k === 6) k = 0
        summation += parseInt(characters[j]) * parseInt(serie[k])
        k++
      }
      rest = summation % 11
      let dv = 11 - rest
      if (dv === 10) dv = "K"
      else if (dv === 11) dv = 0
      return dv.toString().trim().toUpperCase() === dig.toString().trim().toUpperCase()
    }
    return false
  } else return false
}

const phoneValidation = (value) => /^[0-9\b]+$/.test(value)

const passwordValidation = (value) => {
  if (!new RegExp(".{10,}").test(value)) return false
  if (!new RegExp(".[!@#$%^&?*_-]").test(value)) return false
  if (!new RegExp("[A-Z]").test(value)) return false
  if (!new RegExp("[a-z]").test(value)) return false
  if (!new RegExp("[0-9]").test(value)) return false
  return true
}

const nameValidation = (value) => {
  if (!minLengthValidation(value, 2)) return false
  return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(value)
}

const rolesValidation = async (role) => {
  try {
    // if (!Array.isArray(roles)) return false
    const enumRoles = ["SUPER_ADMIN", "WEB_ADMIN", "DEFAULT"]
    return enumRoles.includes(role)
    // return !enumRoles.some((r) => roles.indexOf(r) >= 0)
  } catch (err) {
    return false
  }
}

const ipValidation = (value) => {
  // Regex expression for validating IPv4
  const ipv4Regex = new RegExp("(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])")

  // Regex expression for validating IPv6
  const ipv6Regex = new RegExp("((([0-9a-fA-F]){1,4})\\:){7}([0-9a-fA-F]){1,4}")

  // Checking if it is a valid IPv4 addresses
  if (ipv4Regex.test(value)) return true

  // Checking if it is a valid IPv6 addresses
  if (ipv6Regex.test(value)) return true

  // Return Invalid
  return false
}

const whatsAppNumberValidation = (value) => /^([+]*\d{3,})*\s?\d{3}[-]?\d{6}/.test(value)

const slugValidation = (value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)

const levelValidation = (value) => ["level1", "level2", "level3"].includes(value)

const priorityValidation = (value) => arraysAreEquals(["pack", "product", "banner"], value)

const isValidUrl = (urlString) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
    "(\\#[-a-z\\d_]*)?$",
    "i"
  ) // validate fragment locator
  return !!urlPattern.test(urlString)
}

const minLengthValidation = (value, minLength) => value.toString().trim().length >= minLength
// #endregion

// ***********************
// |       NUMBERS       |
// ***********************
// #region numbers validations
const isNotNumber = (value) => isNaN(value)
// #endregion

// ************************
// |       BOOLEANS       |
// ************************
// #region numbers validations
const isBoolean = (value) => typeof value === "boolean"
// #endregion

// ***********************
// |       OBJECTS       |
// ***********************
// #region objects validations
const objectsHaveSameKeysAndTypeof = (a, b) => {
  const objects = [a, b]
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), [])
  const union = new Set(allKeys)
  if (!objects.every((object) => union.size === Object.keys(object).length)) return false
  let sameType = true
  Object.keys(a).map((key) => {
    if (sameType) sameType = typeof b[key] === typeof a[key]
  })
  return sameType
}
// #endregion

// **********************
// |       ARRAYS       |
// **********************
// #region arrays validations
const arrayContainsOnlyStrings = (array) => array.every((element) => typeof element === "string")
const arrayContainsOnlyNumbers = (array) => array.every((element) => !isNaN(element))
const arrayContainsOnlyArrays = (array) => array.every((element) => Array.isArray(element))
const arraysAreEquals = (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length === b.length) {
      return a.every((element) => {
        if (b.includes(element)) return true
        return false
      })
    }
    return false
  }
  return false
}
// #endregion

module.exports = {
  fieldsValidations,
  dataValidation,
  passwordValidation,
  emailValidation,
  phoneValidation,
  isValidUrl,
  minLengthValidation,
  runValidation,
  rolesValidation,
  nameValidation,
  isNotNumber,
  ipValidation,
}
