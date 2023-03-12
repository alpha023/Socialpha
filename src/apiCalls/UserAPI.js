import axios from "axios";
import { SERVER_URL } from "../Constants";

export const getFriendsOfUser = async (userId) => {
  try {
    const res = await axios.get(
      `${SERVER_URL}/api/users/myfriends/${userId}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (userId) => {
  if (userId) {
    try {
      const res = await axios.get(
        `${SERVER_URL}/api/users?userId=${userId}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }else{
    return null;
  }
};
// export const getUserByUsername = async (username) => {
//   if (userId) {
//     try {
//       const res = await axios.get(
//         `http://localhost:8000/api/posts/profile/${username}`
//       );
//       return res.data;
//     } catch (err) {
//       console.log(err);
//     }
//   }else{
//     return null;
//   }
// };

export const getAllSuggestedUsersToShowTimelinePosts=async (userId)=>{
    try {
        const res = await axios.get(
          `${SERVER_URL}/api/users/all/${userId}`
        );
        return (res.data);
      } catch (err) {
        console.log(err);
      }
};

export const getUserByUsername=async (username)=>{

    try {

        const res=await axios.get(`${SERVER_URL}/api/users?username=${username}`);
        return (res.data);
        
    } catch (err) {
        
        console.log(err);
    }

   
};

export const acceptFriendRequest=async (userId,f)=>{
    try {

        const res=await axios.post(`${SERVER_URL}/api/users/accept/${userId}/${f}`);
        return res.data;
        
    } catch (err) {

        console.log(err);
        
    }
}