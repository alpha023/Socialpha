import axios from "axios";
import { SERVER_URL } from "./Constants";

export const loginCall = async (userCredential, dispatch) => {

  dispatch({
    type: "LOGIN_START",
  });

  try {
    const res = await axios.post(
      `${SERVER_URL}/api/auth/login`,
      userCredential
    );
   
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });
  
    // socket?.emit("addUser", socket.id);
  } catch (err) {
    // console.log(err);

    dispatch({
      type: "LOGIN_FAILURE",
      payload: err,
    });
  }
};

export const logoutCall=(dispatch,socket)=>{

  dispatch({
    type:"LOG_OUT"
  });

  socket?.emit("logout", socket);

}
