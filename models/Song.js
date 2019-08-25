const mongoose = require('mongoose');
const SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  audio: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  duration: {
    type: String
  },
  tags: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('song', SongSchema);
