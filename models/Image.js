const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a Image name"],
  },
  description: {
    type: String,
  },
  isPublise: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },  
});

module.exports = mongoose.model("Image", ImageSchema);
