
import React, { useEffect, useState } from "react";
import { getCommentedUsers } from "../../apiCalls/PostAPI";
import "./comment.css";

const Comment = ({ comment }) => {
  const [cUser, setCUser] = useState(null);
  useEffect(() => {
    // const getCommentedUser=async ()=>{
    //     try {
    //         const res=await axios.get(`http://localhost:8000/api/users?userId=${comment.userId}`);
    //         setCUser(res.data);
    //     } catch (err) {

    //         console.log(err);

    //     }
    // };
    getCommentedUsers(comment.userId)
      .then((data) => {
        setCUser(data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [comment]);
  return (
    <div className="commentUser">
      <div className="commentUserWrapper">
        <div className="commentInfo">
          <img className="commentProfilePic" src={cUser?.profilePic} alt="" />
          <div className="commentTextInfo">
            <span className="profileName">{cUser?.username}</span>
            <br />
            <span className="commentText">{comment?.text}.</span>
          </div>
        </div>
      </div>
      <div className="commentLikeReplyInfo">
        <span className="commentLike">like</span>
        <span className="commentReply">reply</span>
      </div>
      <hr />
    </div>
  );
};

export default Comment;
