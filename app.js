const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const {
  login,
  createUser,
  updateCurrentUser,
  getCurrentUser,
} = require("./controllers/users");
const auth = require("./middlewares/auth");
const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("./controllers/clothingItems");
const {
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} = require("./utils/errors");

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

app.post("/signin", login);
app.post("/signup", createUser);

app.use("/", mainRouter);

// Error handling middleware
app.use((err, res) => {
  console.error(err.stack);
  res
    .status(INTERNAL_SERVER_ERROR_CODE)
    .send({ message: INTERNAL_SERVER_ERROR });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
