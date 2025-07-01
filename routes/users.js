const router = require("express").Router();
const { updateCurrentUser, getCurrentUser } = require("../controllers/users");

// router.get("/", getUsers);
// router.get("/:userId", getUser);
// router.post("/", createUser);

router.patch("/users/me", updateCurrentUser);
router.get("/users/me", getCurrentUser);

module.exports = router;
