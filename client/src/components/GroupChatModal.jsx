import React, { useEffect, useRef, useState } from "react";
import { Usecontext } from "../context/AuthContext";
import axiosSource from "./Axios/Axios";

const GroupChatModal = ({ showPopup, setShowPopup }) => {
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResuls, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const createPopupRef = useRef(null);

  const { chats, setChats } = Usecontext();

  useEffect(() => {
    const handle = (event) => {
      if (!createPopupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, []);

  const handleSearch = (query) => {
    setLoading(true);
    setSearch(query);

    axiosSource
      .get(`/user?search=${search}`)
      .then((res) => {
        if (res.data) {
          setLoading(false);
          setSearchResults(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUsers = (e) => {
    setSelectedUser([e, ...selectedUser]);
  };

  const deleteUser = (u) => {
    setSelectedUser(selectedUser.filter((user) => user._id !== u._id));
  };

  const groupSubmit = (e) => {
    e.preventDefault();
    if (!chatName || !selectedUser) {
      window.alert("Please fill all the fildes!");
    }

    axiosSource
      .post("/chat/createGroup", {
        chatName,
        users: selectedUser.map((u) => u._id),
      })
      .then((res) => {
        if (res.data) {
          setChats([res.data, ...chats]);
          setShowPopup(false);
        }
      })
      .catch((err) => console.log(err));
  };

  // console.log(chats);

  return (
    <div className={`${showPopup ? "overaly_wrap" : ""} overlay_duration`}>
      <div
        ref={createPopupRef}
        className={`${
          showPopup ? "create__group popup_active" : "create__group"
        }`}
      >
        <h2>Create Group Chat</h2>

        <form onSubmit={groupSubmit}>
          <div className="userlist_wrap">
            {selectedUser?.map((user) => (
              <div className="single_user" key={user._id}>
                <p>{user.name}</p>
                <svg
                  onClick={() => deleteUser(user)}
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
          <input
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            type="text"
            placeholder="Chat name"
          />
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Add users"
          />

          <div className="search_list_wrap">
            {loading && <p>Loading....</p>}
            {!loading &&
              searchResuls?.map((search) => (
                <div
                  onClick={() => handleUsers(search)}
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
            <button className="create__chat__button">Create Chat</button>
          </div>
          <button className="close_popup" onClick={() => setShowPopup(false)}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupChatModal;
