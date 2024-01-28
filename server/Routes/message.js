const { createMessage, getAllUsers } = require("../Controllers/message");
const router = require("express").Router();

router.post("/createMessage", createMessage);
router.post("/getAllMessages", getAllUsers);
module.exports = router;
