const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST,
  NOT_FOUND,
  NOT_FOUND_CODE,
  BAD_REQUEST_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
  CONFLICT_CODE,
  UNAUTHORIZED_CODE,
} = require("../utils/errors");

// Not needed for Project 13, will keep for reference for now
// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.status(200).send(users))
//     .catch((err) => {
//       console.error(err);
//       return res
//         .status(INTERNAL_SERVER_ERROR_CODE)
//         .send({ message: INTERNAL_SERVER_ERROR });
//     });
// };

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(200).send(userObj);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST });
      }
      if (err.code === 11000) {
        return res.status(CONFLICT_CODE).send({
          message: CONFLICT,
        });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: INTERNAL_SERVER_ERROR });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Assuming you have a function to generate a token
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      console.error(err);

      if (err.message === UNAUTHORIZED_CODE) {
        return res.status(UNAUTHORIZED_CODE).send({ message: UNAUTHORIZED });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: INTERNAL_SERVER_ERROR });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: INTERNAL_SERVER_ERROR });
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: INTERNAL_SERVER_ERROR });
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
