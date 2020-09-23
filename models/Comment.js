const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    trim: true,
    required: [true, "Please add a comment title"],
  },
  commentBy: {
    type: String,
    trim: true,
    required: [true, "Please add a commented name"],
  },
  isPublise: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
