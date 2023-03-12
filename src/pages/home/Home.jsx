import React, { useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import './home.css'
import logo from './4.JPG'

const Home = () => {

  const [showFriends,setShowFriends]=useState(false);
  const [progress,setProgress]=useState(0);

  const setProgressBar=(p)=>{setProgress(p);};

  const toggle=()=>{
    setShowFriends(!showFriends);
  };
  
  

  return (
    <>
      <Topbar toggle={toggle} progress={progress}/>
      
      
      <div className="homeContainer">
        <Sidebar setProgressBar={setProgressBar}/>
        <Feed showFriends={showFriends} setProgressBar={setProgressBar}/>
        <Rightbar logo={logo} setProgressBar={setProgressBar} />
      </div>
    {/* <CommentPage/>
    <CommentModal/> */}
    </>
  );
};

export default Home;
