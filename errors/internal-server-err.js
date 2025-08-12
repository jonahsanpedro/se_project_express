const { INTERNAL_SERVER_ERROR_CODE } = require("../utils/errors");

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.status = INTERNAL_SERVER_ERROR_CODE;
  }
}

module.exports = InternalServerError;
