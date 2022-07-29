const express = require('express');
const router = express.Router();
const { FILTER_BY, SORT_BY } = require('../../utils/constants');

const db = require('../../models');

router.get('/tasks/:token', async (req, res, next) => {

  try {

    const { page = 1, filterBy, pp = 5, order } = req.query;
    let tasks;
    const whereCondition = filterBy ? { done: FILTER_BY[filterBy] } : {}

    tasks = await db.Task.findAndCountAll({
      where: whereCondition,
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
