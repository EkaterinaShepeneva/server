const express = require("express");
const router = express.Router();
const helper = require("../../helper");
const errors = require("../../errors");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.patch("/tasks/:idTask", async(req, res, next) => {
  try {
    let tasks = await helper.getArray();
    const { idTask } = req.params;
    const { name } = req.body;
    const notFound = helper.taskNotFound(idTask);

    if (notFound) {
      throw errors.error404(notFound);
    }

    if (name) {
      const errorValidate = helper.validate(name);

      if (errorValidate) {
        throw errors.error400(errorValidate);
      }

      tasks.find((task) => {
        if (task.uuid === idTask) {
          task.name = name;
          task.updatedAt = new Date();
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
    const modifiedTask = helper.findTask(idTask);
    res.status(200).send(modifiedTask);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
