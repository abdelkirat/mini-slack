const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.NODE_PORT || 5000;
const config = require('config');
const auth = require('./middleware/auth');
// Models
const MessageModel = require('./models/Message');

// Routes
const authRoutes = require('./routes/api/auth');
const messagesRoutes = require('./routes/api/messages');

app.use(express.json());

mongoose.connect(config.get('mongoURI'), {
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

io.on('connection', socket => {
  console.log('Client connected.');
  socket.on('sendMessage', message => {
      const newMessage = new MessageModel({
        user: message.user,
        message: message.message
      });

      newMessage.save().then(message => io.sockets.emit('newMessage', message));
  });
  socket.on('disconnect', () => console.log('Client disconnected.'));
});

app.use('/api/messages', messagesRoutes);
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
