const express = require("express");
const router = express.Router();
const {taskNotFound, getArray, validate, writeArray, findTask} = require("../../utils/helpers");
const errors = require("../../utils/errors");

router.patch("/tasks/:idTask", async (req, res, next) => {
  try {
    let tasks = await getArray();
    const { idTask } = req.params;
    const { body } = req;
    const notFound = await taskNotFound(idTask); 

    if (notFound) {
      throw errors.error404(notFound);
    }

    if (body.name) {
      const errorValidate = await validate(body.name);

      if (errorValidate) {
        throw errors.error422(errorValidate);
      }
    }

    const oldTask = tasks.find((task) => task.uuid === idTask);
    const newTask = { ...oldTask, ...body };
    const newTasks = tasks.map((item) => {
      if (item.uuid === idTask) {;
        return newTask;
      }
      return item;
    });

    await writeArray(newTasks);
    const modifiedTask =findTask(idTask);
    res.status(200).send(modifiedTask);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
