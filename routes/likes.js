const express = require("express");
const {
	updateImage,
	updatePost
} = require("../controllers/likes");

const router = express.Router({ mergeParams: true });

router.route("/image/:id")
	.put(updateImage)

router.route("/post/:id")
	.put(updatePost);
	
module.exports = router;