const express = require("express")
fs = require("fs"),
url = require("url");
format = require('../node_modules/date-fns/format')

require("dotenv").config();

USER_ID = process.env.USER_ID;

const router = express.Router();

router.get("/tasks", function (req, res, next) {
  let tasks = JSON.parse(fs.readFileSync("data.json"))
  const { page, filterBy } = req.query //////////
  const len = tasks.length
  if (req.query.filterBy) {
    if(req.query.filterBy==='done')
    tasks = tasks.filter(task => task.done === true)
    else tasks= tasks.filter(task => task.done === false)
  }

  if (req.query.order === 'asc'){
    tasks = tasks.sort((prev, next) => prev.createdAt - next.createdAt);
  } else {tasks = tasks.sort((prev, next) => next.createdAt - prev.createdAt)
;}

  tasks = tasks.slice(((req.query.page-1)*req.query.pp), req.query.pp*req.query.page);

  res.send({count: len, tasks});
  next();
});

router.post("/tasks", function (req, res, next) {
  postTask(req.body);///
  res.send("Записал");/////crud
  next();////не нужен
});

router.patch('/tasks/:idTask', (req, res, next)=>{

  let tasks = JSON.parse(
    fs.readFileSync("data.json")
  );

  if (req.body.name){
    tasks.find((task) => {
      if (task.uuid === req.params.idTask) {
        task.name = req.body.name;
        task.updatedAt = format(new Date(), 'kk:mm:ss dd/MM/yyyy')
        return true;
      }
    });

  } else {
    tasks.find((task) => {
      if (task.uuid === req.params.idTask) {
        task.done = !task.done;
        return true;
      }
    })
  }

  fs.writeFileSync("data.json", JSON.stringify(tasks));
  res.send('ok')
  next()
})

router.delete('/tasks/:idTask',(req, res, next)=>{

  let tasks = JSON.parse(
    fs.readFileSync("data.json") ///избавится от вложенности 
  );

  tasks = tasks.filter((task) => task.uuid !== req.params.idTask)
  
  fs.writeFileSync("data.json", JSON.stringify(tasks)); //имя файла в констан7ту
  res.send('ok')
  next()
})

const postTask = (task) => {
  const tasks = JSON.parse(
    fs.readFileSync("data.json")
  );

  console.log(task);
  task.uuid = generatorUuid();
  task.done = false;
  task.userId = USER_ID;
  task.createdAt = format(new Date(), 'kk:mm:ss dd/MM/yyyy')
  task.updatedAt = format(new Date(), 'kk:mm:ss dd/MM/yyyy')

  tasks.push(task);

  fs.writeFileSync("data.json", JSON.stringify(tasks));////асихронно использовать я
};

const generatorUuid = () => {
  return String(Math.random());
};

module.exports = router;

///Если функция не используется больше, то отставляем в пост запросе, если
//она повторяется - выносим
