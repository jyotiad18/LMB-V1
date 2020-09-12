const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please add a post title"],
    maxlength: [200, "title can not be more than 200 characters"],
  },
  description: {
    type: String,
  },
  shortDescription: {
    type: String,
    required: [true, "Please add a short description"],
    maxlength: [250, "title can not be more than 250 characters"],
  },
  year: {
    type: Number,
    required: [true, "Please add a year"],
  },
  tag: {
    type: [String],
  },
  videoUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Catgory",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
