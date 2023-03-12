import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

import { AuthContext } from "../../context/AuthContext";
import UserList from "../userlist/UserList";
import {

  getPostsOfUserByUsername,
  getTimelinePostsOfUser,
 
} from "../../apiCalls/PostAPI";

const Feed = ({ username, showFriends, setProgressBar }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(
    () => {
      // const fetchPosts = async () => {
      //   try {
      //     const res = username ? await axios.get(
      //       `http://localhost:8000/api/posts/profile/${username}`
      //     ) : await axios.get(
      //       `http://localhost:8000/api/posts/timelineposts/${user._id}`
      //     );
      //     setPosts(res.data.sort((p1,p2)=>{
      //       return new Date(p2.createdAt)-new Date(p1.createdAt);
      //     }));
      //   } catch (err) {
      //     console.log(err.toJSON());
      //   }
      // };
      // fetchPosts();
      const prom = username
        ? getPostsOfUserByUsername(username)
        : getTimelinePostsOfUser(user._id);
      prom
        .then((data) => {
          setPosts(
            data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [username],
    user?._id
  );
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user?.username) && <Share />}

        {!username && showFriends ? (
          <UserList />
        ) : (
          posts.map((p) => {
            // isPostLikedByUser(user._id, p._id)
            //   .then((data) => {
            //     console.log(data);
            //     return (
            //       <Post key={p._id} post={p} setProgressBar={setProgressBar} isLikedPost={data} />
            //     );
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //   });
            return (
              <Post key={p._id} post={p} setProgressBar={setProgressBar} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Feed;
