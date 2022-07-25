const express = require("express");
const router = express.Router();
const helper = require("../../helper");
const format = require("../../node_modules/date-fns/format/index.js");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.patch("/tasks/:idTask", (req, res) => {
  let tasks = helper.getArray();

  if (req.body.name) {
    tasks.find((task) => {
      if (task.uuid === req.params.idTask) {
        task.name = req.body.name;
        task.updatedAt = format(new Date(), "kk:mm:ss dd/MM/yyyy");
        return true;
      }
    });
  } else {
    tasks.find((task) => {
      if (task.uuid === req.params.idTask) {
        task.done = !task.done;
        return true;
      }
    });
  }

  helper.writeArray(tasks);
  res.send("ok");
});

module.exports = router;
