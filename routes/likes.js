const express = require("express");
const {
	updateImage,
	updatePost
} = require("../controllers/likes");

const router = express.Router({ mergeParams: true });

router.route("/inImage/:id")
	.put(updateImage)

router.route("/inPost/:id")
	.put(updatePost);
	
module.exports = router;