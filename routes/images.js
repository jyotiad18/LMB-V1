const express = require("express");
const {
  getImages,
  getImage,
  createImage,
  updateImage,
  deleteImage,
} = require("../controllers/images");

const Image = require("../models/Image");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

router.route("/").get(advancedResults(Image), getImages).post(createImage);

router.route("/:id").get(getImage).put(updateImage).delete(deleteImage);

module.exports = router;
