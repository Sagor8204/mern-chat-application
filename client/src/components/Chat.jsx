import React from "react";
import { Usecontext } from "../context/AuthContext";
import SignleChat from "./SignleChat";

const Chat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = Usecontext();
  // console.log(selectedChat);

  return (
    <div className={`${selectedChat?.chatName ? "" : "text_center"} chat`}>
      {selectedChat?.chatName ? (
        <div className="chat_main">
          <SignleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
      ) : (
        <div>
          <h1>Click on a user to start chatting</h1>
        </div>
      )}
    </div>
  );
};

export default Chat;
