const constants = require("./constants");

fs = require("fs");
url = require("url");

async function getArray() {
  const arrayJson = await fs.promises.readFile(constants.TASK_STORAGE, "utf8");
  const array = JSON.parse(arrayJson);
  return array;
}

async function writeArray(array) {
  const arrayJson = JSON.stringify(array);
  await fs.promises.writeFile(constants.TASK_STORAGE, arrayJson);
}

async function findTask(id) {
  const getTask = await getArray();
  const task = getTask.find((task) => task.uuid === id);
  if (task) return task;
}

async function validate(name) {
  const getTasks = await getArray();

  const taskClone = getTasks.find((item) => item.name === name);

  if (taskClone) {
    const message = "Such a task already exists";

    return message;
  }
  const invalidСharacters = name.match(/[*#^&_~]/gi);

  if (invalidСharacters) {
    console.log(invalidСharacters);
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

module.exports = { getArray, writeArray, findTask, validate, taskNotFound };
