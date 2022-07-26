const error404 = (message) => ({
  code: 404,
  message,
});

const error422 = (message) => ({
  code: 422,
  message,
});

const error400 = (message) => ({
  code: 400,
  message,
});

const error500 = (message) => ({
  code: 500,
  message,
});

module.exports = { error400, error404, error500, error422 };
