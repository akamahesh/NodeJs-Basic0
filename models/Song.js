const mongoose = require('mongoose');
const SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  audio: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  tags: {
    type: [String]
  }
});
SongSchema.set('timestamps', true); // this will add createdAt and updatedAt timestamps
module.exports = Song = mongoose.model('song', SongSchema);
