const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItems");
const { NOT_FOUND, NOT_FOUND_CODE } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND });
});

module.exports = router;
