const express = require('express');
const router = express.Router();
const { FILTER_BY, SORT_BY } = require('../../utils/constants');
const { auth } = require('../../middleware/auth')

const db = require('../../models');

router.get('/tasks', auth, async (req, res, next) => {

  try {
    const { page = 1, filterBy, pp = 5, order } = req.query;
    const token = req.headers.authorization.split(' ')[1];
    const { login } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    let tasks;
    const whereCondition = filterBy ? { done: FILTER_BY[filterBy] } : {}

    const { dataValues } = await db.User.findOne({
      where: { login },
    })

    tasks = await db.Task.findAndCountAll({
      where: [whereCondition, { user_id: dataValues.userId }],
      order: [['createdAt', order === 'asc' ? SORT_BY.ASC : SORT_BY.DESC,]],
      limit: pp,
      offset: (+page - 1) * +pp
    })

    const { count, rows } = tasks
    res.status(200).send({ count, tasks: rows });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
