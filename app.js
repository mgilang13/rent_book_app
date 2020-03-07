const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const book = require("./src/route/book");
const genre = require("./src/route/genre");
const admin = require("./src/route/admin");
const logger = require("morgan");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(logger("dev"));
app.use(bodyParser.json());
app.listen(port, () => {
  console.log("Server On using Port", port);
});

app.use("/api/v1/book/", book);
app.use("/api/v1/genre/", genre);
app.use("/api/v1/admin/", admin);

module.exports = app;
