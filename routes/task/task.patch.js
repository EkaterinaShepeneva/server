const express = require("express");
const router = express.Router();
const {
  taskNotFound,
  validate,
  findTask,
} = require("../../utils/helpers");
const errors = require("../../utils/errors");
const db = require("../../models");

router.patch("/tasks/:idTask", async (req, res, next) => {
  try {
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

    await db.Task.update({ ...body }, { where: { uuid: idTask } });

    const modifiedTask =findTask(idTask);
    res.status(200).send(modifiedTask);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
