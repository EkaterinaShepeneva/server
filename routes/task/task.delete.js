const express = require("express");
const router = express.Router();
const helpers = require("../../helpers");
const errors = require("../../errors");

router.delete("/tasks/:idTask", async (req, res, next) => {
  try {
    let tasks = await helpers.getArray();
    const { idTask } = req.params;
    const notFound = await helpers.taskNotFound(idTask);
    if (notFound) {
      throw errors.error404(notFound);
    }

    tasks = tasks.filter((task) => task.uuid !== idTask);
    await helpers.writeArray(tasks);
    res.status(200).send(idTask);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
