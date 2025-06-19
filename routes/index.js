const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItems");
const { BAD_REQUEST } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(404).send({ message: BAD_REQUEST });
});

module.exports = router;
