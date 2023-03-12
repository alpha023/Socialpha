import {
  Chat,
  Person,
  Search,
  Notifications,
  PersonOutline,
} from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from "../../apiCalls";

import "./topbar.css";

//
import edit from "./img/edit.png";
import inbox from "./img/envelope.png";
import settings from "./img/settings.png";
import help from "./img/question.png";
import logout from "./img/log-out.png";
import axios from "axios";
import { Box, LinearProgress } from "@material-ui/core";
import { SERVER_URL } from "../../Constants";
//

const Topbar = (props) => {
  const { user, dispatch, socket } = useContext(AuthContext);
  //const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //
  const [open, setOpen] = useState(false);
  const [personClick, setPersonClick] = useState(false);
  const [requests, setRequests] = useState(0);

  let menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // useEffect(()=>{

  //   socket.current=io(`ws://localhost:8900`);

  // },[])
  //

  const handleLogOut = (e) => {
    e.preventDefault();
    try {
      // console.log(props.socket.current)
      logoutCall(dispatch, socket);

      // socket.current = io("ws://localhost:8900");
      // socket.current.on("getMessage", (data) => {
      //   setArrivalMessage({
      //     sender: data.senderId,
      //     text: data.text,
      //     createdAt: Date.now(),
      //   });
      // });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  const getFriendRequestUsers = async () => {
    try {
      const res = await axios.get(
        `${SERVER_URL}/api/users/friendrequests/${user._id}`
      );
      setRequests(res.data.length);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriendRequestUsers();
  }, []);

  return (
    <div className="finalTopbar">
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Socialpha</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friends, post or video"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem" onClick={props.toggle}>
              {personClick ? (
                <Person onClick={() => setPersonClick(!personClick)} />
              ) : (
                <PersonOutline onClick={() => setPersonClick(!personClick)} />
              )}
              <span className="topbarIconBadge">{requests}</span>
            </div>

            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>

          <div className="menu-container" ref={menuRef}>
            <div
              className="menu-trigger"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <img src={user?.profilePic} className="topbarImg" />
            </div>

            <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
              <h3>
                {user?.username}
                <br />
                <span>Website Designer</span>
              </h3>
              <ul>
                <li className="dropdownItem">
                  <img className="mypic" src={user?.profilePic} />
                  <NavLink to={`/profile/${user?.username}`}>
                    {" "}
                    {"My Profile"}{" "}
                  </NavLink>
                </li>
                <li className="dropdownItem">
                  <img src={edit}></img>
                  <a> {"Edit Profile"} </a>
                </li>
                <li className="dropdownItem">
                  <img src={inbox}></img>
                  <a> {"Inbox"} </a>
                </li>
                <li className="dropdownItem">
                  <img src={settings}></img>
                  <a> {"Settings"} </a>
                </li>
                <li className="dropdownItem">
                  <img src={help}></img>
                  <a> {"Help"} </a>
                </li>
                <li className="dropdownItem" onClick={handleLogOut}>
                  <img src={logout}></img>
                  <a> {"Log Out"} </a>
                </li>

                {/* <DropdownItem img={user} text={"My Profile"} />

              <DropdownItem img={edit} text={"Edit Profile"} />
              <DropdownItem img={inbox} text={"Inbox"} />
              <DropdownItem img={settings} text={"Settings"} />
              <DropdownItem img={help} text={"Helps"} />
              <DropdownItem img={logout} text={"Logout"} /> */}
              </ul>
            </div>
          </div>
          {/* <img src="./2.png" className="topbarImg" /> */}
        </div>
      </div>
      <Box sx={{ width: "100%" }} className="progress">
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={props.progress===100?0:props.progress}
        />
      </Box>
    </div>
  );
};

export default Topbar;
