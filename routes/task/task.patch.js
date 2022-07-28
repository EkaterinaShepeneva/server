const express = require("express");
const router = express.Router();
const {
  taskNotFound,
  validate,
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

    const [count, task] = await db.Task.update({ ...body }, { where: { uuid: idTask }, returning: true, plain: true })

    res.status(200).send(task);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
