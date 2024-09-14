import React, { useState } from "react";
import { Usecontext } from "../context/AuthContext";

const UpdateGroupChatModal = ({ fetchMessage, fetchAgain, setFetchAgain }) => {
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const { selectedChat, setSelectedChat, user } = Usecontext();

  const handleSearch = async (query) => {
    setLoading(true);
    setSearch(query);
    try {
      const res = await fetch(`/user?search=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async (user1) => {
    try {
      const res = await fetch("chat/addUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: selectedChat._id,
          userId: user1._id,
        }),
      });
      const data = await res.json();
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
    setChatName("");
  };

  const handleRename = async () => {
    try {
      const res = await fetch("chat/rename", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: selectedChat._id,
          name: chatName,
        }),
      });
      const data = await res.json();

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
    setChatName("");
  };

  const handleRemove = async (user1) => {
    try {
      const res = await fetch("chat/remove", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user1._id,
          chatId: selectedChat._id,
        }),
      });
      const data = await res.json();
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessage();
    } catch (error) {
      console.log(error);
    }
    setChatName("");
  };

  return (
    <div>
      <h2>Timepass</h2>
      <div className="userlist_wrap">
        {selectedChat.users?.map((Suser) => (
          <div className="single_user" key={Suser._id}>
            <p>{Suser.name}</p>
            <svg
              onClick={() => handleRemove(Suser)}
              className="close_user"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))}
      </div>
      <div className="update_name_button">
        <input
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          type="text"
          placeholder="Chat name"
        />
        <button onClick={handleRename}>Update</button>
      </div>
      <input
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        placeholder="Add user to group"
      />

      <div className="search_list_wrap">
        {loading && <p>Loading....</p>}
        {!loading &&
          searchResults?.map((search) => (
            <div
              onClick={() => handleAddUser(search)}
              className="search__list"
              key={search.name}
            >
              <img src={search.pic} alt="" />
              <div>
                <p>{search.name}</p>
                <p className="search__email">Email: {search.email}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="create_button_wrap">
        <button
          onClick={() => handleRemove(user)}
          className="create__chat__button"
        >
          Leave Group
        </button>
      </div>
    </div>
  );
};

export default UpdateGroupChatModal;
