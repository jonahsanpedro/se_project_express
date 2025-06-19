const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(404).send({ message: NOT_FOUND });
});

module.exports = router;
