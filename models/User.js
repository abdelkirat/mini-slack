const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstname: String,
  lastname: String
}, {
  timestamps: true
});

// eslint-disable-next-line func-names
UserSchema.pre('save', function(next) {
  const self = this;

  if (!self.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(self.password, salt, (error, hash) => {
      if (error) return next(error);

      self.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => cb(err, isMatch));
};

module.exports = User = mongoose.model('user', UserSchema);
