const express = require("express");
const router = express.Router();
const helper = require("../../helper.js");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.post("/tasks", (req, res) => {
  const task = req.body;
  const tasks = helper.getArray();
  const idTask = String(Math.random());
  const newTask = {
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
});

module.exports = router;
