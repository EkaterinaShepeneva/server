const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { error500 } = require("./errors");
const recursive = require("recursive-readdir-sync");

require("dotenv").config();

const BASE_PORT = process.env.SERVER_BASE_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(BASE_PORT, () => {
  console.log(`Example app listening on port ${BASE_PORT}`);
});

recursive(`${__dirname}/routes/task`).forEach((file) =>
  app.use("/", require(file), function (err, req, res, next) {
    if (err.code) {
      return res.status(err.code).send(err);
    }
    res.status(500).send(error500(err.message));
  })
);
