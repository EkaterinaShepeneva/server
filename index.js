const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const recursive = require("recursive-readdir-sync");

(fs = require("fs")), (url = require("url"));

require("dotenv").config();

BASE_PORT = process.env.SERVER_BASE_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(BASE_PORT, () => {
  console.log(`Example app listening on port ${BASE_PORT}`);
});

app.all("/", (req, res, next) => {
  console.log("поймал -> ", req.body);
  res.send("yes");
  next();
});

recursive(`${__dirname}/routes/task`).forEach((file) =>
  app.use("/", require(file))
);
