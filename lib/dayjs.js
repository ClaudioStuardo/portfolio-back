// Libraries
const dayjs = require("dayjs")

// Dayjs configuration
const es = require("dayjs/locale/es")
const utc = require("dayjs/plugin/utc")
const timezone = require("dayjs/plugin/timezone")
const localizedFormat = require("dayjs/plugin/localizedFormat")
const relativeTime = require("dayjs/plugin/relativeTime")
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore")
const customParseFormat = require("dayjs/plugin/customParseFormat")
const weekday = require("dayjs/plugin/weekday")
dayjs.locale(es)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(isSameOrBefore)
dayjs.extend(customParseFormat)
dayjs.extend(weekday)

module.exports = {
  dayjs,
}