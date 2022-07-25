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

const resSendTask = (idTask) => getArray().find((task) => task.uuid === idTask);

const validate = (task) => {
  const taskClone = getArray().find((item) => item.name === task.name);
  if (taskClone) {
    const error = {
      message: "Такая задача есть",
    };
    return error;
  }

  const invalidСharacters = task.name.match(/[*#^&_~]/gi);

  if (invalidСharacters) {
    const error = {
      message: "Запрещёнка",
    };
    return error;
  }
};

module.exports = { getArray, writeArray, resSendTask, validate };
