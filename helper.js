const constants = require("./constants");

fs = require("fs");
url = require("url");

const getArray = () => {
  const arrayJson = fs.readFileSync(constants.TASK_STORAGE);

  const array = JSON.parse(arrayJson);
  return array;
};

const writeArray = (array) => {
  const arrayJson = JSON.stringify(array);
  fs.writeFileSync(constants.TASK_STORAGE, arrayJson);
};

const findTask = (id) => getArray().find((task) => task.uuid === id);

const validate = (task) => {
  const taskClone = getArray().find((item) => item.name === task.name);
  if (taskClone) {
    const message = "Такая задача есть";
    return message;
  }

  const invalidСharacters = task.name.match(/[*#^&_~]/gi);

  if (invalidСharacters) {
    const message = "Запрещёнка";
    return message;
  }
};

const taskNotFound = (id) => {
  const taskFound = findTask(id);
  if (!taskFound) {
    const message = "Задача не найдена";
    return message;
  }
};

module.exports = { getArray, writeArray, findTask, validate, taskNotFound };
