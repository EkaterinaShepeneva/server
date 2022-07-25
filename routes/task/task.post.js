const express = require("express");
const router = express.Router();
const helper = require("../../helper.js");
const errors = require("../../errors");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.post("/tasks", (req, res, next) => {
  try {
    const task = req.body;
    const errorValidate = helper.validate(task);

    if (errorValidate) {
      throw errors.error400(errorValidate);
    }

    const tasks = helper.getArray();
    const idTask = String(Math.random());
    const newTask = {
      name: task.name,
      uuid: idTask,
      done: false,
      userId: USER_ID,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    tasks.push(newTask);
    helper.writeArray(tasks);

    const modifiedTask = helper.resSendTask(idTask);

    res.status(200).send(modifiedTask);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
