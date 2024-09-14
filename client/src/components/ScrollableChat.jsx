import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/chatConfig";
import { Usecontext } from "../context/AuthContext";

const ScrollableChat = ({ messages }) => {
  const { user } = Usecontext();

  // console.log(user);

  return (
    <ScrollableFeed>
      <div className="message_scroll">
        {/* {messages &&
          messages.map((m, i) => {
            console.log(isLastMessage(messages, i, user._id));
          })} */}
        {messages &&
          messages.map((m, i) => (
            <div
              className="message_wrap"
              style={{
                marginTop: isSameUser(messages, m, user._id) ? 3 : 10,
              }}
              key={m._id}
            >
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <img
                  className="message_user_img"
                  style={{ marginRight: "8px" }}
                  src={m.sender.pic}
                  alt=""
                />
              )}
              <p
                style={{
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "fit-content",
                }}
              >
                {m.content}
              </p>
            </div>
          ))}
      </div>
    </ScrollableFeed>
  );
};

export default ScrollableChat;
