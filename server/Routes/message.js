const { createMessage, getAllMessages } = require("../Controllers/message");
const router = require("express").Router();

router.post("/createMessage", createMessage);
router.post("/getAllMessages", getAllMessages);
module.exports = router;
