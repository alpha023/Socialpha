import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../Constants";
import { AuthContext } from "../../context/AuthContext";
import "./addfriend.css";

const AddFriend = ({ f, fr ,getFriendRequestUsers}) => {
//   const [thisUser, setThisUser] = useState(f ? f : null);
  const { user } = useContext(AuthContext);

//   const [acceptedClicked,setAcceptedClicked]=useState(false);
//   const [requestUsers,setRequestUsers]=useState([]);

  const [addFriendClicked, setAddFriendClicked] = useState(false);
  const addFriendClick = () => {
    try {
      const sendFriendRequest = async () => {
        const res = await axios.post(
          `${SERVER_URL}/api/users/request/${user._id}/${f._id}`
        );
        setAddFriendClicked(!addFriendClicked);
        // console.log(res.data);
      };
      const cancelFriendRequest = async () => {
        const res = await axios.post(
          `${SERVER_URL}/api/users/cancelrequest/${user._id}/${f._id}`
        );
        setAddFriendClicked(!addFriendClicked);
      };
      if (!addFriendClicked) {
        sendFriendRequest();
      } else {
        cancelFriendRequest();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const acceptReqHandler=async ()=>{
    try {
        const res=await axios.post(`${SERVER_URL}/api/users/accept/${user._id}/${f._id}`);
        getFriendRequestUsers();
    } catch (err) {
        
    }
    // acceptFriendRequest(user._id,f._id).then((data)=>{})
  };
  const cancelReqHandler=async ()=>{
    try {
        const res=await axios.post(`${SERVER_URL}/api/users/cancel/${user._id}/${f._id}`);
        getFriendRequestUsers();
    } catch (err) {

        console.log(err);
        
    }
  }


  return (
    <div className="friend">
      <div className="friendWrapper">
        <Link to={`/profile/${f?.username}`}>
          <div className="friendProfileInfo">
            <img className="friendProfileImg" src={f?.profilePic} alt="" />
            <h4 className="friendProfileName">{f?.username}</h4>
          </div>
        </Link>
        <div className="addFriend">
          {!fr ? (
            <button className="addFriendButton" onClick={addFriendClick}>
              {addFriendClicked ? "Cancel Request" : "Add Friend"}
            </button>
          ) : (
            <>
              <button className="addFriendButton" onClick={acceptReqHandler}>
                {/* {addFriendClicked ? "Cancel Request" : "Add Friend"} */}
                Accept
              </button>
              <button className="addFriendButton" onClick={cancelReqHandler}>
                {/* {addFriendClicked ? "Cancel Request" : "Add Friend"} */}
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
