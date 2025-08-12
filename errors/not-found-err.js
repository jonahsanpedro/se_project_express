const { NOT_FOUND_CODE } = require("../utils/errors");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND_CODE;
  }
}

module.exports = NotFoundError;
