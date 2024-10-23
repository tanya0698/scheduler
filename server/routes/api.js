"use strict";
const express = require("express");
const { verifyToken } = require("../utility/auth");
const auth = require("../services/auth");
const roles = require("../services/roles");
const events = require("../services/events");
const appointments = require("../services/appointments");
const status = require("../services/status");

const router = express.Router();

router.use("/", auth);
router.use("/", roles);
router.use("/", events);
router.use("/", appointments);
router.use("/", status);

module.exports = router;
