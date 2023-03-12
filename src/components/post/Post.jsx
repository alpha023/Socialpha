import {
  Favorite,
  FavoriteBorderOutlined,
  MoreVert,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import InputEmoji from "react-input-emoji";
import { getUserById } from "../../apiCalls/UserAPI";
import { SERVER_URL } from "../../Constants";

const Post = ({ post ,isLikedPost}) => {
  const [comments, setComments] = useState(post?.comments?.length);
  const [like, setLike] = useState(post?.likes?.length);

  //const [postNew, setPostNew] = useState(post);

  const [isHeart, setIsHeart] = useState(false);
  const [user, setUser] = useState({});
  const [currentComment, setCurrentComment] = useState("");

  const { user: currentUser } = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState(isLikedPost);

  console.log(isLiked);

  
  // useEffect(() => {
  //   getPostById(post._id)
  //     .then((data) => {
  //       setPostNew(data);
  //       setIsLiked(postNew.likes.includes(user._id));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [post]);

  const likeHandler = async () => {
    try {
      await axios.put(`${SERVER_URL}/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const dislikeHandler = async () => {
    try {
      await axios.put(`${SERVER_URL}/api/posts/${post._id}/dislike`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(post?.likes?.includes(currentUser._id));
  }, [currentUser._id, post?.likes]);

  useEffect(() => {
    // const fetchUser = async () => {
    //   const res = await axios.get(
    //     `http://localhost:8000/api/users?userId=${post.userId}`
    //   );
    //   setUser(res.data);
    // };
    // fetchUser();
    // setUser(getUserById(post?.userId));
    getUserById(post?.userId)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [post.userId]);

  const commentPostHandle = async (e) => {
    e.preventDefault();
    if (currentComment.length !== 0) {
      try {
        const res = await axios.post(
          `${SERVER_URL}/api/posts/commentpost/${post?._id}`,
          {
            userId: currentUser._id,
            text: currentComment,
          }
        );

        const res2 = await axios.get(
          `${SERVER_URL}/api/posts/getpost/${post?._id}`
        );

        setComments(res2.data.comments.length);
        setCurrentComment("");
      } catch (err) {}
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user?.username}`}>
              <img src={user?.profilePic} alt="" className="postProfileImg" />
            </Link>
            <span className="postUsername">{user?.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="postTopRightOptionIcon" />
          </div>
        </div>
        <div className="postCenter">
          <p className="postText">{post?.desc}</p>
          <img src={post?.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <img
              src={"http://localhost:8000/images/gif/like.png"}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            /> */}
            {!isLiked ? (
              <ThumbUpAltOutlined className="likeIcon" onClick={likeHandler} />
            ) : (
              <ThumbUp className="likeIcon" onClick={dislikeHandler} />
            )}

            {/* <img
              src={"http://localhost:8000/images/gif/heart.png"}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            /> */}
            {!isHeart ? (
              <FavoriteBorderOutlined
                className="heartIcon"
                onClick={() => setIsHeart(!isHeart)}
              />
            ) : (
              <Favorite
                className="heartIcon"
                onClick={() => setIsHeart(!isHeart)}
              />
            )}

            <span className="postLikeCounter">{like} peoples liked it..</span>
          </div>
          <div className="postBottomRight">
            <NavLink
              to={`/commentsection/${post._id}`}
              className="postCommentText"
            >
              {comments} comments
            </NavLink>
          </div>
        </div>
        <form onSubmit={commentPostHandle}>
          <div className="writeComment">
            <InputEmoji
              onChange={(c) => {
                setCurrentComment(c);
              }}
              value={currentComment}
              placeholder="write comment here..."
            />
            <button
              type="submit"
              className="commentPostButton"
              onClick={commentPostHandle}
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
