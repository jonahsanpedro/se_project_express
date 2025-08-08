const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const { login, createUser } = require("./controllers/users");
const { errorHandler } = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

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

app.use(requestLogger);
app.use(mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.post("/signin", login);
app.post("/signup", createUser);

app.use("/", mainRouter);

// Error handling middleware, using imported errorHandler instead
// app.use((err, _req, res, _next) => {
//   console.error(err.stack);
//   res
//     .status(INTERNAL_SERVER_ERROR_CODE)
//     .send({ message: INTERNAL_SERVER_ERROR });
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
