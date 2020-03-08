const express = require("express");
const route = express.Router();
const book = require("../controller/book");
const auth = require("../helper/auth");

route
  .all("*", auth.authInfo)
  .get("/", book.getBook)
  .get("/searchBook", book.searchBook)
  .get("/sortBookByTitle", book.sortBookByTitle)
  .get("/sortBookByDate", book.sortBookByDate)
  .get("/sortBookByGenre", book.sortBookByGenre)
  .get("/sortBookByAvailability", book.sortBookByAvailability)
  .post("/addbook", book.addBook)
  .patch("/:idbook", book.updateBook)
  .patch("/returnBook/:idbook", book.returnBook)
  .patch("/rentBook/:idbook", book.rentBook)
  .delete("/:idbook", book.deleteBook);
module.exports = route;
