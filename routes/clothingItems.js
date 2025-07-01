const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

router.post("/", auth, createItem);

router.get("/", getItems);

router.delete("/:id", auth, deleteItem);

router.put("/:id/likes", auth, likeItem);

router.delete("/:id/likes", auth, dislikeItem);

module.exports = router;
