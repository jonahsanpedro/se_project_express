const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  NOT_FOUND_CODE,
  BAD_REQUEST_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: INTERNAL_SERVER_ERROR });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: INTERNAL_SERVER_ERROR });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

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

module.exports = { getUsers, createUser, getUser };
