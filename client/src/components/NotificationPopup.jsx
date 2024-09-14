import React from "react";

const NotificationPopup = ({ showNotification }) => {
  return (
    <div
      className={`${
        showNotification ? "active user_list_option" : "user_list_option"
      }`}
    >
      <ul>
        <li>
          <a href="#">Notifications</a>
        </li>
      </ul>
    </div>
  );
};

export default NotificationPopup;
