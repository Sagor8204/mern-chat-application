const express = require("express");
const { sendMessage, allMessage } = require("../controllers/messageController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/", authenticate, sendMessage);

router.get("/:id", authenticate, allMessage);

module.exports = router;
