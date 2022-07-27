const express = require("express");
const router = express.Router();
const helpers = require("../../utils/helpers.js");
const errors = require("../../utils/errors");
const { v4: uuidv4 } = require("uuid");
const db = require("../../models");

require("dotenv").config();

router.post("/tasks", async (req, res, next) => {
  try {
    const taskName = req.body.name.trim();
    const tasks = tasks = await db.Task.findAll();
    const errorValidate = await helpers.validate(taskName);

    if (errorValidate) {
      throw errors.error422(errorValidate);
    }

    const idTask = uuidv4();

    await db.Task.create({
      uuid: idTask,
      name: taskName,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    const modifiedTask = await helpers.findTask(idTask);

    res.status(200).send(modifiedTask);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
