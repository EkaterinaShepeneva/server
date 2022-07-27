const express = require("express");
const router = express.Router();
const { getArray } = require("../../utils/helpers");
const { FILTER_BY, SORT_BY } = require("../../utils/constants");

const db = require("../../models");

router.get("/tasks", async (req, res, next) => {
  try {
    let tasks = await db.Task.findAll();
    // let tasks = await getArray();
    // const { page = 1, filterBy, pp = 5, order } = req.query;
    // let tasksCount = tasks.length;
    // if (filterBy) {
    //   if (filterBy === FILTER_BY.DONE) {
    //     tasks = tasks.filter((task) => task.done);
    //     tasksCount = tasks.length;
    //   } else if (filterBy === FILTER_BY.UNDONE) {
    //     tasks = tasks.filter((task) => !task.done);
    //     tasksCount = tasks.length;
    //   }
    // }
    // if (order === SORT_BY.ASC) {
    //   tasks = tasks.sort((prev, next) => {
    //     return new Date(prev.createdAt) - new Date(next.createdAt);
    //   });
    // } else if (order === SORT_BY.DESC) {
    //   tasks = tasks.sort((prev, next) => {
    //     return new Date(next.createdAt) - new Date(prev.createdAt);
    //   });
    // }
    // tasks = tasks.slice((page - 1) * pp, pp * page);
    // res.status(200).send({ count: tasksCount, tasks });
    console.log(tasks);
    res.status(200).send(tasks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
