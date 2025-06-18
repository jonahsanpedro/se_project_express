const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);

router.get("/", getItems);

router.put("/:itemId", updateItem);

router.delete("/:itemId", deleteItem);

router.put("/:id/likes", likeItem);

router.delete("/:id/likes", dislikeItem);

module.exports = router;
