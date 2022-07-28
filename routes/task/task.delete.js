const express = require("express");
const router = express.Router();
const { taskNotFound } = require("../../utils/helpers");
const errors = require("../../utils/errors");
const db = require("../../models");

router.delete("/tasks/:idTask", async (req, res, next) => {
  try {
    const { idTask } = req.params;
    const notFound = await taskNotFound(idTask);
    if (notFound) {
      throw errors.error404(notFound);
    }

    db.Task.destroy({
      where: {
        uuid: idTask,
      },
    })

    res.status(200).send(idTask);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
