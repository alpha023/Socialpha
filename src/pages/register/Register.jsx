import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { Link } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/Firebase";
import { SERVER_URL } from "../../Constants";

const Register = () => {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("password wont matched");
    } else {
      const storageRef = ref(storage, `/profile/${new Date()}`);
      const uploadTask = uploadBytesResumable(storageRef, profilePic);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            console.log(url);
            const user = {
              username: username.current.value,
              email: email.current.value,
              password: password.current.value,
              profilePic: url,
            };
            try {
              await axios.post(`${SERVER_URL}/api/auth/register`, user);
              navigate("/login");
            } catch (err) {}
          });
        }
      );
      // const user = {
      //   username: username.current.value,
      //   email: email.current.value,
      //   password: password.current.value,
 
      // };
      // try {
      //   await axios.post(`http://localhost:8000/api/auth/register`, user);
      //   navigate("/login");
      // } catch (err) {}
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socialpha</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Socialpha
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="text"
              required
              placeholder="username"
              className="loginInput"
              ref={username}
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="loginInput"
              ref={email}
            />
            <input
              type="password"
              required
              placeholder="password"
              className="loginInput"
              ref={password}
              minLength={8}
            />
            <input
              type="password"
              required
              placeholder="confirm password"
              className="loginInput"
              ref={passwordAgain}
              minLength={8}
            />
            <label htmlFor="file" className="shareOption">
              Upload Profile Pic
              <input
                type="file"
                id="pfile"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </label>
            <label htmlFor="file" className="shareOption">
              Upload Cover Pic
              <input
                type="file"
                id="cfile"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setCoverPic(e.target.files[0])}
              />
            </label>
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to={"/login"}>
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
