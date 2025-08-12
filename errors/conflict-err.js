const CONFLICT_CODE = require("../utils/errors");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = CONFLICT_CODE;
  }
}

module.exports = ConflictError;
