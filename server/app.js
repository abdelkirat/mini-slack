const app = require('express')();
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http);

app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.listen({ port: 4000 }, () => {
  console.info(`🛰 Server ready at http://localhost:4000`);
});
