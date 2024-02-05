const express = require("express");

const rateLimitMiddleware = require("../middlewares/ratelimiter");

const MailController = require("../controllers/mail");

const api = express.Router();

api.post("/send", [rateLimitMiddleware], MailController.sendNotification);

module.exports = api;
