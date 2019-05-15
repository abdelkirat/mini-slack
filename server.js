const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.NODE_PORT || 5000;
const mongoURI = require('./config/keys').mongoURI;

const MessageModel = require('./models/Message');
const messagesRoutes = require('./routes/api/messages');

app.use(bodyParser.json());

mongoose.connect(mongoURI, { useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

io.on('connection', socket => {
  console.log('Client connected.');
  socket.on('sendMessage', message => {
    const newMessage = new MessageModel({
      user: '',
      message: message.message
    });

    newMessage.save().then(message => io.sockets.emit('newMessage', message));

  });
  socket.on('disconnect', () => console.log('Client disconnected.'));
});

app.use('/api/messages', messagesRoutes);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
