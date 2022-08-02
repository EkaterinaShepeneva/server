const express = require("express");
const router = express.Router();
const {
  taskNotFound,
  validate,
} = require("../../utils/helpers");
const errors = require("../../utils/errors");
const db = require("../../models");
const { auth } = require('../../middleware/auth')

router.patch("/tasks/:idTask", auth, async (req, res, next) => {
  try {
    const { idTask } = req.params;
    const { body } = req;
    const { login, name } = req.body
    const notFound = await taskNotFound(idTask);

    if (notFound) {
      throw errors.error404(notFound);
    }

    const { dataValues } = await db.User.findOne({
      where: { login },
    })

    if (name) {
      const errorValidate = await validate(name, dataValues.userId);
      if (errorValidate) {
        throw errors.error422(errorValidate);
      }
    }

    const [count, task] = await db.Task.update({ ...body }, { where: [{ uuid: idTask }, { user_id: dataValues.userId }], returning: true, plain: true })
    res.status(200).send(task);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
