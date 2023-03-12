import React, { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatonline/ChatOnline";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";
import axios from "axios";
import io from "socket.io-client";
import InputEmoji from "react-input-emoji";
import { SERVER_URL } from "../../Constants";
const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [receiver,setReceiver]=useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]);

  const scrollRef = useRef();
  // const socket = useRef();

  const { user, socket } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(`http://localhost:8000/api/messages`, msg);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(()=>{

  //   socket?.on("welcome",message=>{
  //     console.log(message);
  //   });

  // },[socket]);
  console.log(socket);

  useEffect(() => {
    console.log(socket?.id + "messenger wala socket");
    socket?.emit("addUser", user._id);
    socket?.on("getUsers", (users) => {
      setOnlineUsers(
        user.friends.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}/api/messages/${currentChat?._id}`
        );
        console.log("abhi");
        console.log(res.data);
        setMessages(res.data);

        //

          // if(res.data!==null){
          //   const newRes=await axios.post(`http://localhost:8000/api/conversations`,{
          //     senderId:user._id,
          //     receiverId:

          //   })
          // }

        //


        // if (res.data !== null) {

        // }else{
        //   const newConv=await axios.post(`http://localhost:8000/api/conversations`,{
        //     senderId:user._id,
        //     receiverId:
        //   })
        // }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}/api/conversations/${user._id}`
        );
        console.log(res.data);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);
  console.log(user);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="search for friends"
              className="chatMenuInput"
            />
            {conversations.map((c) => {
              // setReceiver(c.members.find((m) => m !== currentUser._id));
              return (
                <div
                  onClick={() => {
                    setCurrentChat(c);
                  }}
                >
                  <Conversations conversation={c} currentUser={user} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => {
                    return (
                      <div ref={scrollRef}>
                        <Message
                          message={m}
                          own={m.sender == user._id}
                          currentChat={currentChat}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="chatBoxBottom">
                  {/* <textarea
                    className="chatMessageInput"
                    placeholder="enter message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea> */}
                  <InputEmoji
                    value={newMessage}
                    onChange={(e) => setNewMessage(e)}
                  />
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversation">
                Open a conversation to start a new chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
