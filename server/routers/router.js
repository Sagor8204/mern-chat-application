const express = require("express");
const route = express.Router();
const {
  register,
  login,
  allUsers,
  getLogedinUser,
  searchUsers,
} = require("../controllers/auth");
const authenticate = require("../middlewares/authenticate");

route.post("/register", register);

route.post("/login", login);

route.get("/users", authenticate, allUsers);

route.get("/currentUser", authenticate, getLogedinUser);

route.get("/user", authenticate, searchUsers);

route.get("/logout", (req, res) => {
  res.clearCookie("jwtoken");
  res.send("logout");
});

module.exports = route;
