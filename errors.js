const error404 = (mes) => {
  const error = {
    code: 404,
    message: mes,
  };

  return error;
};

const error400 = (mes) => {
  const error = {
    code: 400,
    message: mes,
  };

  return error;
};

module.exports = { error400, error404 };
