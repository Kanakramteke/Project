const mongoose = require('mongoose');

// Schema for replies
const replySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    required: true,
  },
  repliedAt: {
    type: Date,
    default: Date.now,
  },
});

// Schema for discussions
const discussionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [replySchema], // Embedding replies as subdocuments
});

// Export the Discussion model
module.exports = mongoose.model('Discussion', discussionSchema);