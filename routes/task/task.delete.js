const express = require("express");
const router = express.Router();
const helper = require("../../helper");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.delete("/tasks/:idTask", (req, res) => {
  let tasks = helper.getArray();
  const { idTask } = req.params;
  const remoteTask = tasks.find((task) => task.uuid === idTask);

  tasks = tasks.filter((task) => task.uuid !== idTask);
  helper.writeArray(tasks);

  res.send(remoteTask);
});

module.exports = router;
