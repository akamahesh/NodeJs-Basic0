const mongoose = require('mongoose');
const PodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  songs: {
    type: [String]
  }
});
PodSchema.set('timestamps', true); // this will add createdAt and updatedAt timestamps

module.exports = Pod = mongoose.model('pod', PodSchema);
