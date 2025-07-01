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
app.patch("/users", auth, updateCurrentUser);
app.get("/users", auth, getCurrentUser);

app.post("/items", auth, createItem);
app.delete("/items/:id", auth, deleteItem);
app.put("/items/:id/likes", auth, likeItem);
app.delete("/items/:id/likes", auth, dislikeItem);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
