const express = require("express")
fs = require("fs"),
url = require("url");
format = require('../node_modules/date-fns/format')

require("dotenv").config();

USER_ID = process.env.USER_ID;

const router = express.Router();

router.get("/tasks", function (req, res, next) {
  console.log("its router, params = ", req.query);

  let tasks = JSON.parse(fs.readFileSync("data.json"))

  if (req.query.filterBy) {
    if(req.query.filterBy==='done')
    tasks = tasks.filter(task => task.done === true)
    else tasks= tasks.filter(task => !task.done === true)
  }

  if (req.query.order === 'asc'){
    tasks = tasks.sort((prev, next) => prev.createdAt - next.createdAt);
  } else {tasks = tasks.sort((prev, next) => {next.createdAt - prev.createdAt})}

  tasks = tasks.slice(((req.query.page-1)*req.query.pp), req.query.pp*req.query.page);

  res.send({count: tasks.length, tasks});
  next();
});

router.post("/tasks", function (req, res, next) {
  console.log(req.body);
  postTask(req.body);
  res.send("Записал");
  next();
});

const postTask = (task) => {
  const tasks = JSON.parse(
    fs.readFileSync("data.json")
  );

  task.uuid = generatorUuid();
  task.done = false;
  task.userId = USER_ID;
  task.createdAt = format(new Date(), 'kk:mm:ss dd/MM/yyyy')
  task.updatedAt = format(new Date(), 'kk:mm:ss dd/MM/yyyy')

  tasks.push(task);

  fs.writeFileSync("data.json", JSON.stringify(tasks));
};

const generatorUuid = () => {
  return String(Math.random());
};

module.exports = router;

///Если функция не используется больше, то отставляем в пост запросе, если
//она повторяется - выносим
