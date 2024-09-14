const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/", authenticate, accessChat);

router.get("/", authenticate, fetchChats);

router.post("/createGroup", authenticate, createGroupChat);

router.put("/rename", authenticate, renameGroup);

router.put("/remove", authenticate, removeFromGroup);

router.put("/addUser", authenticate, addToGroup);

module.exports = router;
