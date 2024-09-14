const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    const acctualUser = await User.findOne({
      _id: verifyToken.userId,
    }).select({ password: 0 });

    if (!acctualUser) {
      res.status(500).json({ message: "User was not found!" });
    }

    (req.token = token), (req.user = acctualUser);

    next();
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

module.exports = authenticate;
