import { Chat } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comment from "../../components/comment/Comment";

import "./commentpage.css";
import Post from "../post/Post";
import { getCommentsOfPost, getPostById } from "../../apiCalls/PostAPI";

const CommentPage = () => {
  const postId = useParams().postId;
  const [postComments, setPostComments] = useState(null);
  const [post, setPost] = useState({});
  useEffect(() => {
    getCommentsOfPost(postId)
      .then((data) => {
        setPostComments(data);
      })
      .catch((err) => console.log(err));
  }, [postId]);
  useEffect(() => {
    getPostById(postId)
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="commentContainer">
      <Post post={post} key={post._id} />

      <div className="commentWrapper">
        <div className="commentHeader">
          <span className="totalComments">
            {postComments?.length} comments...
          </span>
          <Chat />
        </div>
        <hr className="commentLine" />
        {!(postComments === null)
          ? postComments.map((c) => {
              return <Comment comment={c} key={c.userId} />;
            })
          : ""}
      </div>
    </div>
  );
};

export default CommentPage;
