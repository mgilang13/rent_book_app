const express = require("express");
const route = express.Router();
const book = require("../controller/book");
const auth = require("../helper/auth");

route
  // .all("*", auth.authInfo, auth.accessToken)
  .get("/", book.getBook)
  .post("/addbook", book.addBook)
  .get("/bookDetail/:idbook", book.getBookById)
  .get("/searchBook", book.searchBook)
  .get("/sortBookByTitle", book.sortBookByTitle)
  .get("/sortBookByDate", book.sortBookByDate)
  .get("/sortBookByGenre", book.sortBookByGenre)
  .get("/sortBookByAvail", book.sortBookByAvailability)
  .get("/getBookReturn", book.getBookReturn)
  .patch("/updateBook/:idbook", book.updateBook)
  .patch("/returnBook/:idbook", book.returnBook)
  .patch("/rentBook/:idbook", book.rentBook)
  .delete("/deleteBook/:idbook", book.deleteBook);
module.exports = route;
