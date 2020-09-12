const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const Post = require("../models/Post");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(advancedResults(Post, ["user", "category"]), getPosts)
  .post(createPost);

router.route("/:id")
	.get(getPost)
	.put(updatePost)
	.delete(deletePost);

module.exports = router;
