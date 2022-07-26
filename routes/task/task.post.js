const express = require("express");
const router = express.Router();
const helper = require("../../helper.js");
const errors = require("../../errors");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.post("/tasks", async (req, res, next) => {
  try {
    const task = req.body;
    const errorValidate = await helper.validate(task.name);

    if (errorValidate) {
      throw errors.error400(errorValidate);
    }

    const tasks = await helper.getArray();

    const idTask = uuidv4();
    const newTask = {
      name: task.name,
      uuid: idTask,
      done: false,
      userId: USER_ID,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    tasks.push(newTask);
    await helper.writeArray(tasks);

    const modifiedTask = await helper.findTask(idTask);

    res.status(200).send(modifiedTask);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
