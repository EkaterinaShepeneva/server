const db = require("../models");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const secret = process.env.TOKEN_SECRET;

function generateAccessToken(login) {
  return jwt.sign({ login: login }, secret, { expiresIn: '1800s' });
}

async function findTask(id) {
  const getTask = await db.Task.findAll();
  const task = getTask.find((task) => task.uuid === id);
  if (task) return task;
}

async function validate(name, user_id) {
  const taskClone = await db.Task.findOne({
    where: { user_id, name },
  })

  if (name.length <= 1) {
    const message = "The number of characters must be greater than 1";
    return message;
  }

  if (taskClone) {
    const message = "Such a task already exists";
    return message;
  }
  const invalidCharacters = name.match(/[*#^&_~]/gi);

  if (invalidCharacters) {
    const message = `Invalid syntax: ${invalidCharacters}`;
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

module.exports = { findTask, validate, taskNotFound, generateAccessToken };
