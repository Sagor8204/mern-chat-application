import React, { useEffect, useRef } from "react";
import { Usecontext } from "../context/AuthContext";

const ProfilePopup = ({ showProfile, setShowProfile }) => {
  const { user } = Usecontext();
  const profileRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className={`${showProfile ? "overaly_wrap" : ""} overlay_duration`}>
      <div
        ref={profileRef}
        className={`${
          showProfile ? "create__group popup_active" : "create__group"
        } profile__wrap`}
      >
        <h2>{user.name}</h2>
        <img className="profilePic" src={user.pic} alt={user.pic} />
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePopup;
