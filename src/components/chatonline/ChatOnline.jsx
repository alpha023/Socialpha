import React, { useEffect, useState } from "react";
import "./chatonline.css";
import axios from "axios";
import { getFriendsOfUser } from "../../apiCalls/UserAPI";
import { SERVER_URL } from "../../Constants";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    //setFriends(getFriendsOfUser(currentId));
    getFriendsOfUser(currentId)
      .then((data) => {
        setFriends(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((f) => {
        return onlineUsers.includes(f._id);
      })
    );

    console.log(onlineUsers);
  }, [onlineUsers, friends]);

  const handleClick = async (user) => {
    try {
      const res = axios.get(
        `${SERVER_URL}/api/conversations/find/${currentId}/${user._id}`
      );

      //console.log(`aaaa${res.data != null}aaaaa`);
      if (res.data != null) {
        setCurrentChat(res.data);
      } else {
        const newRes = await axios.post(
          `${SERVER_URL}/api/conversations`,
          {
            senderId: currentId,
            receiverId: user._id,
          }
        );
        // console.log(`yyyy${newRes.data}yyyyy`);
        setCurrentChat(newRes.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => {
        return (
          <div
            className="chatOnlineFriend"
            onClick={() => {
              handleClick(o);
            }}
          >
            <div className="chatOnlineImgContainer">
              <img src={o.profilePic} className="chatOnlineImg" />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o.username}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatOnline;
