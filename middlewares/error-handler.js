const {
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_CODE,
} = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }

  return res
    .status(INTERNAL_SERVER_ERROR_CODE)
    .send({ message: INTERNAL_SERVER_ERROR });
};

module.exports = { errorHandler };
