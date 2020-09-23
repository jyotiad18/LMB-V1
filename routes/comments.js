const express = require("express");
const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

const Comment = require("../models/Comment");
const router = express.Router({ mergeParams: true });
const advancedResults = require("../middleware/advancedResults");

router
  .route("/")
  .get(advancedResults(Comment), getComments);

router
  .route("/post/:id")
  .post(createComment);

router.route("/:id")
	.get(getComment)
	.put(updateComment)
	.delete(deleteComment);

module.exports = router;
