const {signup , login, getUsers} = require("../Controllers/user")
const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users/:username", getUsers);
module.exports = router;