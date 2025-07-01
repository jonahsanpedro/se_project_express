const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config").JWT_SECRET;
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

  console.log(token);
  console.log("Authorization header:", authorization);
  console.log("Token after extraction:", token);
  console.log("Token length:", token ? token.length : "token is falsy");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res.status(FORBIDDEN_CODE).send({ message: FORBIDDEN });
  }

  req.user = payload;

  next();
};
