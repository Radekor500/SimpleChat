
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const {userJoin, getCurrentUser, getRoomUsers, removeUser} = require('./users');


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.emit("welcome", "hello")
  console.log("user connected")
  
  socket.on('join', (userData) => {
    socket.join(userData.roomName);
    userJoin(socket.id,userData.userData,userData.roomName);
    console.log('a user connected to ', userData.roomName);
  })
  socket.on('chat message', (msg) => {
      const user = getCurrentUser(socket.id);
      io.to(user.room).emit('chat message', msg)
      console.log(msg);
  })

  socket.on('getlist', (data) => {
    console.log("data",data)
    
    const clients = getRoomUsers(data.roomName)
    console.log("clients: ",clients)
    io.to(data.roomName).emit('getlist', clients)
  })

  socket.on('userLeave', (data) => {
    io.to(data.roomName).emit('userLeave',socket.id);
  })

  socket.on('disconnect', () => {
      removeUser(socket.id);
      console.log("user disconnected");
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});