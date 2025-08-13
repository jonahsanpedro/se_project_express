const router = require("express").Router();
const { updateCurrentUser, getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateProfile } = require("../middlewares/validation");

router.patch("/me", auth, validateProfile, updateCurrentUser);
router.get("/me", auth, getCurrentUser);

module.exports = router;
