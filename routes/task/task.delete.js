const express = require("express");
const router = express.Router();
const helper = require("../../helper");
const errors = require("../../errors");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.delete("/tasks/:idTask", (req, res, next) => {
  try {
    let tasks = helper.getArray();
    const { idTask } = req.params;

    const notFound = helper.taskNotFound(idTask);
    console.log("notFound = ", notFound);
    if (notFound) {
      console.log("im cc");
      throw errors.error404(notFound);
    }

    const remoteTask = tasks.find((task) => task.uuid === idTask);

    tasks = tasks.filter((task) => task.uuid !== idTask);
    helper.writeArray(tasks);

    res.status(200).send(remoteTask);
  } catch (error) {
    console.log("im b");
    return next(error);
  }
});

module.exports = router;
