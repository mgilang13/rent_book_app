const express = require("express");
const route = express.Router();
const genre = require("../controller/genre");
const auth = require("../helper/auth");

route
  .get("/", genre.getGenre)
  .post("/addgenre", genre.addGenre)
  .patch("/:idgenre", genre.updateGenre)
  .delete("/:idgenre", genre.deleteGenre);

module.exports = route;
