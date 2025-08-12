const { UNAUTHORIZED_CODE } = require("../utils/errors");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = UNAUTHORIZED_CODE;
  }
}

module.exports = UnauthorizedError;
