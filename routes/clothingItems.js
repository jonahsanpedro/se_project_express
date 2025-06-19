const router = require("express").Router();

const {
  createItem,
  getItems,
  // comment out, updateItem, keeping for reference
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);

router.get("/", getItems);

// comment out, keeping for reference
// router.put("/:itemId", updateItem);

router.delete("/:itemId", deleteItem);

router.put("/:id/likes", likeItem);

router.delete("/:id/likes", dislikeItem);

module.exports = router;
