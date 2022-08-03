const express = require("express");
const router = express.Router();
const helpers = require("../../utils/helpers.js");
const errors = require("../../utils/errors");
const db = require("../../models");
const auth = require("../../middleware/auth")

require("dotenv").config();

router.post("/tasks", async (req, res, next) => {
  try {
    const name = req.body.name.trim();
    const token = req.headers.authorization.split(' ')[1];
    const { login } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    const { dataValues } = await db.User.findOne({
      where: { login },
    })

    const errorValidate = await helpers.validate(name, dataValues.userId);
    if (errorValidate) {
      throw errors.error422(errorValidate);
    }

    const task = await db.Task.create({
      name,
      userId: dataValues.userId
    });

    res.status(200).send(task);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
