import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { getFriendsOfUser } from "../../apiCalls/UserAPI";
import { SERVER_URL } from "../../Constants";

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  // const createConv=async (f)=>{

  //   try {
  //     const res=await axios.post(`http://localhost:8000/api/conversations`,{
  //       senderId:user._id,
  //       receiverId:f._id
  //     });
  //   } catch (err) {

  //   }

  // }

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(
          `${SERVER_URL}/api/users/${user._id}/unfollow`,
          { userId: currentUser._id }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`${SERVER_URL}/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  useEffect(() => {
    // const getFriends = async () => {
    //   try {
    //     const res = await axios.get(
    //       `http://localhost:8000/api/users/myfriends/${user._id}`
    //     );
    //     console.log(res.data);
    //     setFriends(res.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // getFriends();
    getFriendsOfUser(user?._id)
      .then((data) => {
        setFriends(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            src={"http://localhost:8000/images/gif/gift.png"}
            alt=""
            className="birthdayImg"
          />
          <span className="birthdayText">
            <b>Rahul Kumar</b> and <b>3 other friends</b> have a birthday
            today..
          </span>
        </div>
        <img
          src={"http://localhost:8000/images/gif/ad.png"}
          alt=""
          className="rightbarAd"
        />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => {
            return <Online key={u.id} user={u} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={followHandler}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}

        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City :</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From :</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship :</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "None"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends?.map((f) => {
            return (
              <Link to={`/profile/${f.username}`}>
                <div className="rightbarFollowing">
                  <img
                    src={f.profilePic}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{f.username}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightBar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
