const express = require("express");
const router = express.Router();
const {getArray, taskNotFound, writeArray} = require("../../utils/helpers");
const errors = require("../../utils/errors");

router.delete("/tasks/:idTask", async (req, res, next) => {
  try {
    let tasks = await getArray();
    const { idTask } = req.params;
    const notFound = await taskNotFound(idTask);
    if (notFound) {
      throw errors.error404(notFound);
    }

    tasks = tasks.filter((task) => task.uuid !== idTask);
    await writeArray(tasks);
    res.status(200).send(idTask);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
