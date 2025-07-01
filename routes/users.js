const router = require("express").Router();
const { updateCurrentUser, getCurrentUser } = require("../controllers/users");

// router.get("/", getUsers);
// router.get("/:userId", getUser);
// router.post("/", createUser);

router.patch("/me", updateCurrentUser);
router.get("/me", getCurrentUser);

module.exports = router;
