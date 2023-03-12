import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getAllSuggestedUsersToShowTimelinePosts } from "../../apiCalls/UserAPI";
import { SERVER_URL } from "../../Constants";
import { AuthContext } from "../../context/AuthContext";
import AddFriend from "../addfriend/AddFriend";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [friendRequestUsers, setFriendrequestUsers] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    // const getAllUsers = async () => {
    //   try {
    //     const res = await axios.get(
    //       `http://localhost:8000/api/users/all/${user._id}`
    //     );
    //     setUserList(res.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // getAllUsers();
    getAllSuggestedUsersToShowTimelinePosts(user._id)
      .then((data) => {
        setUserList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    getFriendRequestUsers();
  }, []);
  const getFriendRequestUsers = async () => {
    try {
      const res = await axios.get(
        `${SERVER_URL}/api/users/friendrequests/${user._id}`
      );
      setFriendrequestUsers(res.data);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {friendRequestUsers.length !== 0 ? (
        <>
          <h3>Your Friend Requests</h3>
          {friendRequestUsers.map((u) => {
            return (
              <AddFriend
                f={u}
                key={u._id}
                fr={true}
                friendRequestUsers={friendRequestUsers}
                getFriendRequestUsers={getFriendRequestUsers}
              />
            );
          })}
        </>
      ) : (
        <h3>no friend requests to show</h3>
      )}
      <>
        <h3>People You may Know</h3>
        {userList.map((user) => {
          return <AddFriend f={user} key={user._id} />;
        })}
      </>
    </div>
  );
};

export default UserList;
