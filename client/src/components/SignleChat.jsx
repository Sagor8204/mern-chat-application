import React, { useEffect, useState } from "react";
import { Usecontext } from "../context/AuthContext";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import UserCheck from "./UserCheck";
import { getSenderFull } from "../config/chatConfig";
import axiosSource from "./Axios/Axios";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

const SignleChat = ({ fetchAgain, setFetchAgain }) => {
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { selectedChat, user, notifications, setNotifications } = Usecontext();

  const submitMessage = (e) => {
    e.preventDefault();

    socket.emit("stop typing", selectedChat._id);

    axiosSource
      .post("/message", { content: newMessage, chatId: selectedChat._id })
      .then((res) => {
        if (res.data) {
          socket.emit("new message", res.data);
          setMessage([...message, res.data]);
          setNewMessage("");
        }
      })
      .catch((err) => console.log(err.response));
  };

  const fetchMessages = () => {
    axiosSource
      .get(`/message/${selectedChat._id}`)
      .then((res) => {
        if (res.data) {
          setMessage(res.data);
          socket.emit("join chat", selectedChat._id);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  // fecth all messages
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // notification and new message recived
  useEffect(() => {
    socket.on("message recived", (newMessageRecevied) => {
      // console.log(newMessageRecevied._id);
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecevied._id
      ) {
        // if (!notifications.includes(newMessageRecevied)) {
        //   setNotifications([newMessageRecevied, ...notifications]);
        //   setFetchAgain(!fetchAgain);
        // }
        // console.log("hello");
      } else {
        setMessage([...message, newMessageRecevied]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    let timeLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiffrent = timeNow - lastTypingTime;

      if (timeDiffrent >= timeLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timeLength);
  };

  // console.log(notifications);

  return (
    <div>
      <UserCheck
        fetchMessage={fetchMessages}
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        selectUser={getSenderFull(user._id, selectedChat.users)}
      />
      <div className="chat_body">
        <div className="chat_show_message">
          <ScrollableChat messages={message} />
        </div>
        <form style={{ marginTop: "20px" }} onSubmit={submitMessage}>
          {isTyping ? (
            <Lottie
              options={defaultOptions}
              style={{ marginLeft: 0 }}
              width={70}
            />
          ) : null}
          <input
            value={newMessage}
            onChange={typingHandler}
            type="text"
            placeholder="Enter your message.."
            required
          />
        </form>
      </div>
    </div>
  );
};

export default SignleChat;
