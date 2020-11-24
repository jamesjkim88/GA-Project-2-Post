const mongoose = require('mongoose');

// The factSchema is used to embedded docs in as tudent doc.
// There is no model and no 'facts' collection
const postSchema = new mongoose.Schema({
  title: String,
  post: String,
  Comments: String
}, {
  timestamps: true
});

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
  post: [postSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);