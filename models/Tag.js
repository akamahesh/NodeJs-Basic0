const mongoose = require('mongoose');
const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String
  }
});
TagSchema.set('timestamps', true); // this will add createdAt and updatedAt timestamps

module.exports = Tag = mongoose.model('tag', TagSchema);
