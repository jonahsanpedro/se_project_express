const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  UNAUTHORIZED,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  FORBIDDEN,
} = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(UNAUTHORIZED_CODE).send({ message: UNAUTHORIZED });
  }

  const token = authorization.replace("Bearer", "").trim();

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res.status(FORBIDDEN_CODE).send({ message: FORBIDDEN });
  }

  req.user = payload;

  return next();
};
