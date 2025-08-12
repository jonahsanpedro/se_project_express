const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
require("dotenv").config();
const cors = require("cors");

const {
  login,
  createUser,
  getCurrentUser,
  updateCurrentUser,
} = require("./controllers/users");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("./controllers/clothingItems");
const { errorHandler } = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const {
  validateId,
  validateUserBody,
  validateAuthentication,
  validateCardBody,
} = require("./middlewares/validation");
const auth = require("./middlewares/auth");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signin", validateAuthentication, login);
app.post("/signup", validateUserBody, createUser);
app.get("/users/me", auth, getCurrentUser);
app.get("/items", getItems);
app.patch("/users/me", auth, validateUserBody, updateCurrentUser);
app.post("/items", auth, validateCardBody, createItem);
app.delete("/items/:id", auth, validateId, deleteItem);
app.put("/items/:id/likes", auth, validateId, likeItem);
app.delete("/items/:id/likes", auth, validateId, dislikeItem);

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
