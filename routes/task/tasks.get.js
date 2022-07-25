const express = require("express");
const router = express.Router();
const helper = require("../../helper");

require("dotenv").config();

USER_ID = process.env.USER_ID;

router.get("/tasks", (req, res) => {
  let tasks = helper.getArray();
  const { page, filterBy, pp } = req.query;
  const len = tasks.length;
  if (filterBy) {
    if (filterBy === "done") tasks = tasks.filter((task) => task.done === true);
    else tasks = tasks.filter((task) => task.done === false);
  }

  if (req.query.order === "asc") {
    tasks = tasks.sort((prev, next) => prev.createdAt - next.createdAt);
  } else {
    tasks = tasks.sort((prev, next) => next.createdAt - prev.createdAt);
  }

  tasks = tasks.slice((page - 1) * pp, pp * page);

  res.send({ count: len, tasks });
});

module.exports = router;

///Если функция не используется больше, то отставляем в пост запросе, если
//она повторяется - выносим
