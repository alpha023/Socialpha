const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId:userId, socketId:socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) =>
    user.socketId !== socketId
  );
};

const getUser = (userId) => {
  return users.find((user) =>{ return user.userId === userId});
};

io.on("connection", (socket) => {
  //when connect
  console.log(users)
  console.log(socket.id+"a user connected from server");
  
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log(users);
    io.emit("getUsers", users);
    
  });

  //when disconnect
  socket.on("disconnect", (socket) => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  // socket.on('login',(s)=>{
  //   addUser()
  // })
  socket.on("logout", (socket) => {
    removeUser(socket?.id);
    io.emit("getUsers", users);
  });

  //send and get msg
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });
});
