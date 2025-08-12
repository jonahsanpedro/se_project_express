import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { UNAUTHORIZED, UnauthorizedError } from "../utils/errors";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: [true, "The email field is required."],
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "The password field is required."],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user || !user.password) {
        const err = new UnauthorizedError(UNAUTHORIZED);
        return Promise.reject(err);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const err = new UnauthorizedError(UNAUTHORIZED);
          return Promise.reject(err);
        }
        return user;
      });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export default mongoose.model("User", userSchema);
