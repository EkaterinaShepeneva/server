const express = require("express");
const router = express.Router();
const { taskNotFound } = require("../../utils/helpers");
const errors = require("../../utils/errors");
const db = require("../../models");
const { auth } = require('../../middleware/auth')

router.delete("/tasks/:idTask", auth, async (req, res, next) => {
  try {
    const { idTask } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const { login } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    const notFound = await taskNotFound(idTask);

    if (notFound) {
      throw errors.error404(notFound);
    }

    const { dataValues } = await db.User.findOne({
      where: { login },
    })

    db.Task.destroy({
      where: [{ uuid: idTask }, { user_id: dataValues.userId }],
    })

    res.status(200).send(idTask);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
