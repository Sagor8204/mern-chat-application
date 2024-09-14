import React, { useEffect, useState } from "react";
import { Usecontext } from "../context/AuthContext";
import GroupChatModal from "./GroupChatModal";
import { getSender } from "../config/chatConfig";
import axiosSource from "./Axios/Axios";

const MyChats = ({ fetchAgain }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats, setSelectedChat } = Usecontext();

  const fetchChats = () => {
    axiosSource
      .get("/chat")
      .then((res) => {
        if (res.data) {
          setChats(res.data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  return (
    <div className="my_chats">
      <div className="gruopchat_wrap">
        <h1>My Chats</h1>
        <button onClick={() => setShowPopup(true)}>New Group Chat</button>
      </div>
      <GroupChatModal showPopup={showPopup} setShowPopup={setShowPopup} />

      {/* group name list */}
      <div className="group_name_list">
        <ul>
          {loading && <p>Loading...</p>}
          {!loading &&
            chats?.map((chat) => (
              <li onClick={() => setSelectedChat(chat)} key={chat._id}>
                {!chat.isGroupChat
                  ? getSender(user._id, chat.users)
                  : chat.chatName}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MyChats;
