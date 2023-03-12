import React, { useEffect, useState } from "react";
import "./conversations.css";
import { getUserById } from "../../apiCalls/UserAPI";

const Conversations = (props) => {
  const { conversation, currentUser } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(conversation);
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    // const getUser = async () => {
    //   try {
    //     const res = await axios.get(
    //       `http://localhost:8000/api/users?userId=${friendId}`
    //     );
    //     setUser(res.data);
    //   } catch (err) {
    //     console.log(e(rr)
    //   }
    // };
    // getUser();
    getUserById(friendId)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img src={user?.profilePic} alt="" className="conversationImg" />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversations;
