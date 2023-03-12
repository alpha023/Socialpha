import React, { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import ReactTyped from "react-typed";


const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch,socket } = useContext(AuthContext);


  const handleClick = (e) => {
    e.preventDefault();
    try {
      loginCall(
        {
          email: email.current.value,
          password: password.current.value,
        },
        dispatch
      );
      
      
      socket?.emit("addUser", socket.id);

      console.log(socket+"user add hua")
      
     
      // console.log(user);
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          {/* <h3 className="loginLogo">Socialpha</h3> */}
          <ReactTyped 
          className="loginLogo"
          strings={['Socialpha']}
          typeSpeed={90}
          backSpeed={50}
          loop
          />
          <span className="loginDesc">
            Connect with friends and the world around you on Socialpha
          </span>
          
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={password}
              required
              minLength={8}
            />
            <button type="submit" className="loginButton" disabled={isFetching}>
              {isFetching?<CircularProgress  size="25px"/>:"Log In"}
            </button>
            <span className="loginForgot">Forget Password?</span>
            <Link to={'/signup'}>
            <button className="loginRegisterButton">
            {isFetching?<CircularProgress  size="25px"/>:"Create a New Account"}
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
