const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItems");
const { NotFoundError } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((_req, _res, next) => next(new NotFoundError("Route not found")));

module.exports = router;
