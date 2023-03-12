import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';
import './message.css';

const Message = ({message,own,currentChat}) => {

  const {user:currentUser}=useContext(AuthContext);

  const [receiver,setReceiver]=useState(null);
  useEffect(()=>{

    const getUser=async ()=>{
      try {
        const friendId = currentChat.members.find((m) => m !== currentUser._id);
        const res=await axios.get(`http://localhost:8000/api/users?userId=${friendId}`)
        setReceiver(res.data);
      } catch (err) {

        console.log(err);
        
      }
    }
    getUser();


    

  },[])
  
  return (
    <div className={own?`message own`:"message"}>
        <div className="messageTop">
            <img src={own? currentUser?.profilePic: receiver?.profilePic} className="messageImg"/>
            <p className="messageText">{`${message.text}`}</p>

        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
      
    </div>
  )
}

export default Message
