import axios from "axios";
import { SERVER_URL } from "../Constants";


export const getCommentedUsers = async (userId) => {
  try {
    const res = await axios.get(
      `${SERVER_URL}/api/users?userId=${userId}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCommentsOfPost = async (postId) => {
  try {
    const res = await axios.get(
      `${SERVER_URL}/api/posts/getcomments/${postId}`
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPostById = async (postId) => {
  try {
    const res = await axios.get(
      `${SERVER_URL}/api/posts/getpost/${postId}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPostsOfUserByUsername = async (username) => {
  try {
    const res = await axios.get(
      `${SERVER_URL}/api/posts/profile/${username}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTimelinePostsOfUser = async (userId) => {
  try {
    const res = await axios.get(
      `${SERVER_URL}/api/posts/timelineposts/${userId}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const isPostLikedByUser = async (userId, postId) => {
  try {
    const res = await axios.get(`${SERVER_URL}/api/posts/isliked`, {
      userId: userId,
      postId: postId,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
