const express = require("express");
const router = express.Router();
const helpers = require("../../helpers");
const errors = require("../../errors");

router.patch("/tasks/:idTask", async (req, res, next) => {
  try {
    let tasks = await helpers.getArray();
    const { idTask } = req.params;
    //const { name } = req.body;
    const notFound = await helpers.taskNotFound(idTask); ////не использ не

    console.log("hello");
    if (notFound) {
      throw errors.error404(notFound);
    }

    if (req.body.name) {
      const errorValidate = await helpers.validate(req.body.name);

      if (errorValidate) {
        throw errors.error422(errorValidate);
      }
    }

    const index = tasks.findIndex((task) => task.uuid === idTask);
    if (index === -1) {
      throw errors.error404("Tasks not found");
    }

    const oldTask = tasks.splice(index, 1);
    console.log("oldTask = ", oldTask);

    const newTask = { ...oldTask, ...req.body }; //////

    tasks.push(newTask);
    // if (name) {
    //   const errorValidate = await helpers.validate(name);

    //   if (errorValidate) {
    //     throw errors.error422(errorValidate);
    //   }

    //   tasks.find((task) => {
    //     ///
    //     if (task.uuid === idTask) {
    //       task.name = name; ///мутирование
    //       task.updatedAt = new Date();
    //       return true;
    //     }
    //   });
    // } else {
    //   tasks.find((task) => {
    //     if (task.uuid === idTask) {
    //       task.done = !task.done;
    //       return true;
    //     }
    //   });
    // }

    await helpers.writeArray(tasks);
    const modifiedTask = helpers.findTask(idTask);
    res.status(200).send(modifiedTask);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
