const express = require("express");
const router = express.Router();
const helper = require("../../helper.js");
const errors = require("../../errors");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.post("/tasks", async(req, res, next) => {
  try {
    console.log('im fine');
    const task = req.body;
    const errorValidate = await helper.validate(task.name);

    if (errorValidate) {
      throw errors.error400(errorValidate);
    }

    
    const tasks = await helper.getArray();

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

    const modifiedTask = await helper.findTask(idTask);

    res.status(200).send(modifiedTask);
  } catch (error) {
    console.log('ERR НА ПОСТУ');
    return next(error);
  }
});

module.exports = router;
