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

module.exports = { getArray, writeArray, resSendTask };
