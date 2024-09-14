require("../db/connection");
const People = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const allUsers = async (req, res) => {
  try {
    const allUser = await People.find({});

    res.status(200).json(allUser);
  } catch (error) {
    res.status(500).json({ message: "User was not found!" });
  }
};

const register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const newUser = await People({ ...req.body, password: hashedPassword });
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Please enter your information!" });
    }

    const userExist = await People.findOne({ email });

    if (userExist) {
      res.status(400).json({ message: "User already created!" });
    }

    const user = await newUser.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ message: "User not found!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please fill in the login box" });
    }

    const useremail = await People.findOne({ email });
    const isMatch = await bcrypt.compare(password, useremail.password);

    const userObject = {
      userId: useremail._id,
      name: useremail.name,
    };

    const user = {
      _id: useremail._id,
      name: useremail.name,
      email: useremail.email,
      pic: useremail.pic,
      admin: useremail.isAdmin,
    };

    if (isMatch) {
      const token = jwt.sign(userObject, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("jwtoken", token, {
        httpOnly: true,
      });
      res.status(200).json({ message: "Login succesfull!", token, user });
    }
  } catch (error) {
    res.status(500).json({ message: "Login unsuccesfull!" });
  }
};

const getLogedinUser = (req, res) => {
  res.send({ result: req.user });
};

const searchUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await People.find(keyword);
    if (!users) {
      res.status(500).json({ message: "Any user can't findout!" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Any user can't findout!" });
  }
};

module.exports = { register, login, allUsers, getLogedinUser, searchUsers };
