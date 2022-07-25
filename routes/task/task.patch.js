const express = require("express");
const router = express.Router();
const helper = require("../../helper");
const format = require("../../node_modules/date-fns/format/index.js");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.patch("/tasks/:idTask", (req, res) => {
  let tasks = helper.getArray();
  const { idTask } = req.params;
  const { name } = req.body;

  if (name) {
    tasks.find((task) => {
      if (task.uuid === idTask) {
        task.name = name;
        task.updatedAt = format(new Date(), "kk:mm:ss dd/MM/yyyy");
        return true;
      }
    });
  } else {
    tasks.find((task) => {
      if (task.uuid === idTask) {
        task.done = !task.done;
        return true;
      }
    });
  }

  helper.writeArray(tasks);

  const modifiedTask = helper.resSendTask(idTask);

  res.send(modifiedTask);
});

module.exports = router;
