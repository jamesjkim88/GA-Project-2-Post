const mongoose = require('mongoose');

// The factSchema is used to embedded docs in as tudent doc.
// There is no model and no 'facts' collection
const userPostSchema = new mongoose.Schema({
  post: String,
}, {
  timestamps: true
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  post: [userPostSchema],
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);