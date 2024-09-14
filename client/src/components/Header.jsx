import React, { useEffect, useRef, useState } from "react";
import SearchUserModal from "./SearchUserModal";
import { Navigate } from "react-router-dom";
import NotificationPopup from "./NotificationPopup";
import ProfilePopup from "./ProfilePopup";
import { Usecontext } from "../context/AuthContext";

const Header = () => {
  const [state, setState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const searchRef = useRef(null);

  const { notifications } = Usecontext();

  // console.log(notifications);

  const handleUserProfile = () => {
    setState(!state);
  };

  const handleSearchPopup = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const handler = (event) => {
      if (!searchRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const searchUsersResults = async () => {
    setLoading(true);
    try {
      const result = await fetch(`/user?search=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();

      setSearchResult(data);
      setLoading(false);
      setSearch("");
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res) {
        <Navigate to="/" replace />;
      }
      localStorage.removeItem("userInfo");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header">
      <div className="container">
        <div className="wrapper">
          <div className="search__option" onClick={handleSearchPopup}>
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <span>Search User</span>
            {/* search users modal */}
            <SearchUserModal
              searchRef={searchRef}
              showModal={showModal}
              search={search}
              setSearch={setSearch}
              searchResult={searchResult}
              sUsers={searchUsersResults}
              loading={loading}
              setShowModal={setShowModal}
            />
          </div>
          <div>
            <h2>Chat Application</h2>
          </div>
          <div className="user__wraper">
            <div className="notification_wrap">
              <svg
                className="icon"
                onClick={() => setShowNotification(!showNotification)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
              <NotificationPopup showNotification={showNotification} />
            </div>
            <div className="user__option" onClick={handleUserProfile}>
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <svg
                className="icon down_icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>

              {/* user profile popup */}
              <div
                className={`${
                  state ? "active user_list_option" : "user_list_option"
                }`}
              >
                <ul>
                  <li onClick={() => setShowProfile(true)}>
                    <a href="#">My Profile</a>
                  </li>
                  <li onClick={logoutHandler}>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfilePopup showProfile={showProfile} setShowProfile={setShowProfile} />
    </div>
  );
};

export default Header;
