const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,    
    required: [true, "Please add a Image name"],    
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Image", ImageSchema);
