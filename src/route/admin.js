const express = require("express");
const route = express.Router();
const admin = require("../controller/admin");
const auth = require("../helper/auth");

route.post("/register", admin.register).post("/login", admin.login);

module.exports = route;
