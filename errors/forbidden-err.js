const { FORBIDDEN_CODE } = require("../utils/errors");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = FORBIDDEN_CODE;
  }
}

module.exports = ForbiddenError;
