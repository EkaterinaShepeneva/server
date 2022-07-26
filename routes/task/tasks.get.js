const express = require("express");
const router = express.Router();
const helper = require("../../helper");
const { FILTER_BY, SORT_BY } = require("../../constants");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.get("/tasks", async (req, res, next) => {
  try {
    let tasks = await helper.getArray();
    const { page, filterBy, pp } = req.query;
    const { order } = req.query;
    let len = tasks.length;

    if (filterBy) {
      if (filterBy === FILTER_BY.DONE) {
        tasks = tasks.filter((task) => task.done === true);
        len = tasks.length;
      } else if (filterBy === FILTER_BY.UNDONE) {
        tasks = tasks.filter((task) => task.done === false);
        len = tasks.length;
      }
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
    res.status(200).send({ count: len, tasks });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
