const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError, ForbiddenError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(
      new UnauthorizedError("Authorization header is missing or invalid")
    );
  }

  const token = authorization.replace("Bearer", "").trim();

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return next(new ForbiddenError("Access denied"));
  }

  req.user = payload;

  return next();
};
