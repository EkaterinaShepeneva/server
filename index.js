const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { error500 } = require("./utils/errors");
const recursive = require("recursive-readdir-sync");
const jwt = require('jsonwebtoken');
const { auth } = require('./middleware/auth')
require("dotenv").config();

const secret = process.env.TOKEN_SECRET;



const BASE_PORT = process.env.SERVER_BASE_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(BASE_PORT, () => {
  console.log(`Example app listening on port ${BASE_PORT}`);
});

app.use('/tasks/:token', async (req, res, next) => {
  const { token } = req.params
  const { login } = req.query
  const verify = auth(login, token)
  if (!verify) res.status(400).send({
    message: "Неверный токен"
  });


  // jwt.verify(token, secret, { login }, (err) => {
  //   if (err) {
  //     console.log('nooo');
  //     return res.status(401).send({
  //       message: "Неверный токен"
  //     });
  //   }
  // })
  if (verify) next()

})

recursive(`${__dirname}/routes/signIn`).forEach((file) =>
  app.use("/", require(file), function (err, req, res, next) {


    if (err.code) {
      return res.status(err.code).send(err);
    }
    res.status(500).send(error500(err.message));
  })
);

recursive(`${__dirname}/routes/task`).forEach((file) =>
  app.use("/", require(file), function (err, req, res, next) {


    if (err.code) {
      return res.status(err.code).send(err);
    }
    res.status(500).send(error500(err.message));
  })
);

recursive(`${__dirname}/routes/registration`).forEach((file) =>
  app.use("/", require(file), function (err, req, res, next) {
    if (err.code) {
      return res.status(err.code).send(err);
    }
    res.status(500).send(error500(err.message));
  })
);

// recursive(`${__dirname}/routes/auth`).forEach((file) =>
//   app.use("/", require(file), function (err, req, res, next) {
//     console.log('ещё один мидлвер');

//     if (err.code) {
//       return res.status(err.code).send(err);
//     }
//     res.status(500).send(error500(err.message));
//   })
// );


