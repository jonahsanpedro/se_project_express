const router = require("express").Router();
const { updateCurrentUser, getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

// router.get("/", getUsers);
// router.get("/:userId", getUser);
// router.post("/", createUser);

router.patch("/me", auth, updateCurrentUser);
router.get("/me", auth, getCurrentUser);

module.exports = router;
