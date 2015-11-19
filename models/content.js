var mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
  title: String,
  rank: Number,
  type: String,
  tags: [String],
  artist: String,
  comments:[String],
  flags: [String],
  location: String
});

module.exports = mongoose.model('content', contentSchema);
