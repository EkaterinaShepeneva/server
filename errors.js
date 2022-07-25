const error404 = (message) => {
  const error = {
    code: 404,
    message: message,
  };

  return error;
};

const error400 = (message) => {
  const error = {
    code: 400,
    message: message,
  };

  return error;
};

module.exports = { error400, error404 };
