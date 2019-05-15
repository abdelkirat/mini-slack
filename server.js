const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.NODE_PORT || 5000;
const mongoURI = require('./config/keys').mongoURI;

const messagesRoutes = require('./routes/api/messages');

app.use(bodyParser.json());

mongoose.connect(mongoURI, { useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use('/api/messages', messagesRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
