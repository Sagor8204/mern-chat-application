const Message = require("../models/messageModel");
const People = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(500).json({ message: "Please passed here valid information!" });
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await People.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { lastMessage: message });

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const allMessage = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.id })
      .populate("sender", "name pic email")
      .populate("chat");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { sendMessage, allMessage };
