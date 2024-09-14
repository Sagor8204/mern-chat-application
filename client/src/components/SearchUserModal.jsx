import React from "react";
import { Usecontext } from "../context/AuthContext";

const SearchUserModal = ({
  showModal,
  sUsers,
  search,
  setSearch,
  searchRef,
  loading,
  searchResult,
  setShowModal,
}) => {
  const { setChats, chats } = Usecontext();

  const accessChats = async (userId) => {
    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setShowModal(false);
      setSearch("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${showModal ? "overaly_wrap" : ""} overlay_duration`}>
      <div
        ref={searchRef}
        className={`${
          showModal ? "search_popup modal_active" : "search_popup"
        }`}
      >
        <h3>Search Users</h3>
        <div className="search_bar">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search by name or email"
          />
          <button onClick={sUsers} type="submit">
            Go
          </button>
        </div>
        <div className="search_list_wrap">
          {loading && <p>Loading....</p>}
          {!loading &&
            searchResult?.map((search) => (
              <div
                onClick={() => accessChats(search._id)}
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
      </div>
    </div>
  );
};

export default SearchUserModal;
