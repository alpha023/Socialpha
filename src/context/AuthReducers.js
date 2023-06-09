
import { io } from "socket.io-client";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

      break;
    case "LOGIN_SUCCESS":

      return (
        {
        user: action.payload,
        isFetching: false,
        error: false,
        socket:io("ws://localhost:8900")
      });
      break;

    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
      break;
    case "LOG_OUT":
      return {
        user:null,
        socket:null
      }
      break;
    case "FOLLOW":
      return{
        ...state,
        user:{
          ...state.user,
          followings:[...state.user.followings,action.payload]
        }
      };
      break;
    case "UNFOLLOW":
      return {
        ...state,
        user:{
          ...state.user,
          followings:state.user.followings.filter(following=>following !==action.payload)
        }
      };
      break;
    default:
      return state;
  }
};

export default AuthReducer;
