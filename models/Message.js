const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: {
    type: String,
    default: `user_${Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000}`
  },
  message: {
    type: String,
    required: true
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = Message = mongoose.model('message', MessageSchema);
