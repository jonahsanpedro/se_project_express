const {
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST,
  BAD_REQUEST_CODE,
  UNAUTHORIZED,
  UNAUTHORIZED_CODE,
  FORBIDDEN,
  FORBIDDEN_CODE,
  NOT_FOUND,
  NOT_FOUND_CODE,
  CONFLICT,
  CONFLICT_CODE,
} = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(INTERNAL_SERVER_ERROR_CODE)
    .send({ message: INTERNAL_SERVER_ERROR });
};

const BadRequestError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST });
};

const UnauthorizedError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(UNAUTHORIZED_CODE).send({ message: UNAUTHORIZED });
};

const ForbiddenError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(FORBIDDEN_CODE).send({ message: FORBIDDEN });
};

const NotFoundError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND });
};

const ConflictError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(CONFLICT_CODE).send({ message: CONFLICT });
};

module.exports = {
  errorHandler,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
};
