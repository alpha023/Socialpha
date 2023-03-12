import React from "react";
import "./closefriend.css";

const CloseFriends = ({user}) => {
  return (
    <li className="sidebarFriend">
      <img
        src={user.profilePic}
        alt=""
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">{user.name}</span>
    </li>
  );
};

export default CloseFriends;
