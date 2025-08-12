const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { validateCardBody, validateId } = require("../middlewares/validation");

router.post("/", auth, validateCardBody, createItem);

router.get("/", getItems);

router.delete("/:id", auth, validateId, deleteItem);

router.put("/:id/likes", auth, validateId, likeItem);

router.delete("/:id/likes", auth, validateId, dislikeItem);

module.exports = router;
