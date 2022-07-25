const express = require("express");
const router = express.Router();
const helper = require("../../helper");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.delete("/tasks/:idTask", (req, res) => {
  let tasks = helper.getArray();

  tasks = tasks.filter((task) => task.uuid !== req.params.idTask);

  helper.writeArray(tasks);
  res.send("ok");
});

module.exports = router;
