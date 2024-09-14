import React, { useEffect, useRef, useState } from "react";
import { Usecontext } from "../context/AuthContext";
import UpdateGroupChatModal from "./UpdateGroupChatModal";

const UserCheck = ({ selectUser, fetchMessage, fetchAgain, setFetchAgain }) => {
  const [singleCheck, setSingleCheck] = useState(false);
  const { selectedChat } = Usecontext();
  const userRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!userRef.current.contains(event.target)) {
        setSingleCheck(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div className="chat_header">
        <h1>
          {selectedChat.isGroupChat ? selectedChat.chatName : selectUser.name}
        </h1>
        <div className="eye__icon">
          <svg
            onClick={() => setSingleCheck(true)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div
        className={`${
          singleCheck ? "overaly_wrap" : "overaly"
        } overlay_duration`}
      >
        <div
          ref={userRef}
          className={`${
            singleCheck ? "create__group popup_active" : "create__group"
          }`}
        >
          {selectedChat?.isGroupChat ? (
            <UpdateGroupChatModal
              fetchMessage={fetchMessage}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          ) : (
            <div className="profile__wrap">
              <h2>{selectUser.name}</h2>
              <img
                className="profilePic"
                src={selectUser.pic}
                alt={selectUser.pic}
              />
              <p>Email: {selectUser.email}</p>
            </div>
          )}
          <button className="close_popup" onClick={() => setSingleCheck(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default UserCheck;
