var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String
});

module.exports = mongoose.model('user', usersSchema);
