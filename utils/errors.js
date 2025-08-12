const BAD_REQUEST = "400: Invalid request";
const BAD_REQUEST_CODE = 400;
const NOT_FOUND = "404: Not found";
const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_ERROR = "500: Internal server error";
const INTERNAL_SERVER_ERROR_CODE = 500;
const CONFLICT = "409: Conflict";
const CONFLICT_CODE = 409;
const UNAUTHORIZED = "401: Unauthorized";
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN = "403: Forbidden";
const FORBIDDEN_CODE = 403;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = BAD_REQUEST_CODE;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND_CODE;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.status = INTERNAL_SERVER_ERROR_CODE;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = CONFLICT_CODE;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = UNAUTHORIZED_CODE;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = FORBIDDEN_CODE;
  }
}

export {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
  FORBIDDEN,
  BadRequestError,
  NotFoundError,
  InternalServerError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
};
