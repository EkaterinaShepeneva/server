const express = require('express');
const router = express.Router();
const { FILTER_BY, SORT_BY } = require('../../utils/constants');

const db = require('../../models');

router.get('/tasks', async (req, res, next) => {

  try {
    const { page = 1, filterBy , pp = 5, order } = req.query;

    let tasks = [];
    let tasksCount = 1

    if (filterBy) {
    tasks = await db.Task.findAll({
        where: {
          done: filterBy === 'done' ? FILTER_BY.DONE : FILTER_BY.UNDONE,
        },
      });
      tasksCount = tasks.length
    } else {
    tasks = await db.Task.findAll();
    tasksCount = tasks.length
    }


    if (order === SORT_BY.ASC) {
      tasks = tasks.sort((prev, next) => {
        return new Date(prev.createdAt) - new Date(next.createdAt);
      });
    } else if (order === SORT_BY.DESC) {
      tasks = tasks.sort((prev, next) => {
        return new Date(next.createdAt) - new Date(prev.createdAt);
      });
    }

    tasks = tasks.slice((page - 1) * pp, pp * page);
    res.status(200).send({ count: tasksCount, tasks });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
