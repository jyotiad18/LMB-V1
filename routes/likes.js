const express = require("express");
const { updatePostLikes, updateImageLikes } = require("../controllers/likes");

const router = express.Router({ mergeParams: true });
router.route("/")
	.put(updatePostLikes)
	.put(updateImageLikes);
	
module.exports = router;