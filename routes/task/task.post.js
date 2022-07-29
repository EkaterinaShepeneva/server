const express = require("express");
const router = express.Router();
const helpers = require("../../utils/helpers.js");
const errors = require("../../utils/errors");
const db = require("../../models");
const auth = require("../../middleware/auth")

require("dotenv").config();

router.post("/tasks/:token", async (req, res, next) => {
  try {
    const taskName = req.body.name.trim();
    const errorValidate = await helpers.validate(taskName);

    if (errorValidate) {
      throw errors.error422(errorValidate);
    }

    const task = await db.Task.create({
      name: taskName,
    });

    res.status(200).send(task);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
