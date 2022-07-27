const db = require("../models");

async function findTask(id) {
  const getTask = await db.Task.findAll();
  const task = getTask.find((task) => task.uuid === id);
  if (task) return task;
}

async function validate(name) {
  const getTasks =  await db.Task.findAll();
  const taskClone = getTasks.find((item) => item.name === name);

  if (name.length <= 1) {
    const message = "The number of characters must be greater than 1";
    return message;
  }

  if (taskClone) {
    const message = "Such a task already exists";
    return message;
  }
  const invalidСharacters = name.match(/[*#^&_~]/gi);

  if (invalidСharacters) {
    const message = `Invalid syntax: ${invalidСharacters}`;
    return message;
  }
}

async function taskNotFound(id) {
  const taskFound = await findTask(id);
  if (!taskFound) {
    const message = "The task has not been created";
    return message;
  }
}

module.exports = { findTask, validate, taskNotFound };
