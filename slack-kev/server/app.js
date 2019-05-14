const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  // console.log(socket);
});

server.listen({ port: 4000 }, () => {
  console.info(`🛰 Server ready at http://localhost:4000`);
});
