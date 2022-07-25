const express = require("express");
const router = express.Router();
const format = require("../../node_modules/date-fns/format/index.js");
const helper = require("../../helper.js");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.post("/tasks", (req, res) => {
  const task = req.body;
  const tasks = helper.getArray();
  const idTask = String(Math.random());

  task.uuid = idTask;
  task.done = false;
  task.userId = USER_ID;
  task.createdAt = format(new Date(), "kk:mm:ss dd/MM/yyyy");
  task.updatedAt = format(new Date(), "kk:mm:ss dd/MM/yyyy");

  tasks.push(task);
  helper.writeArray(tasks);

  const modifiedTask = helper.resSendTask(idTask);

  res.send(modifiedTask);
});

module.exports = router;
