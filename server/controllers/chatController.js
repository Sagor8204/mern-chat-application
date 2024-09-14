const Chat = require("../models/chatModel");
const People = require("../models/userModel");

const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(500).json({ message: "UserId not found!" });
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: req.userId } } },
    ],
  });

  isChat = await People.populate(isChat, {
    path: "lastMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).json(fullChat);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const fetchChats = async (req, res) => {
  try {
    Chat.find({ users: req.user._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await People.populate(result, {
          path: "lastMessage.sender",
          select: "name pic email",
        });

        res.status(200).json(result);
      });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.chatName) {
    res.status(500).json({ message: "Please fill all the fileds!" });
  }

  const users = req.body.users;

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.chatName,
      users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const renameGroup = async (req, res) => {
  const { chatId, name } = req.body;

  const updateChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: name,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateChat) {
    res.status(500).json({ message: "Chat not updated!" });
  } else {
    res.status(200).json(updateChat);
  }
};

const removeFromGroup = async (req, res) => {
  const { userId, chatId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  try {
    if (!removed) {
      res.status(400).json({ message: "Removed user not found!" });
    }
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const addUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  try {
    if (!addUser) {
      res.status(400).json({ message: "Please add valid user in this group!" });
    }
    res.status(200).json(addUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
