const express = require("express");
const route = express.Router();
const avail = require("../controller/availability");

route.get("/availCheck", avail.getAvail)

module.exports = route;