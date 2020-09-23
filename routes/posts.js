const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPostByCategory,
} = require("../controllers/posts");

const Post = require("../models/Post");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(
    advancedResults(Post, [
      "category",
      "user",
      "photos.photo",
      "comments.comment",
    ]),
    getPosts
);
router
  .route("/:id")
  .get(getPost);

router
  .route("/category/:id")
  .get(getPostByCategory)
  
router
  .use(protect)
  .use(authorize("admin"))
  .route("/")  
  .post(createPost);

router
  .use(protect)
  .use(authorize("admin"))
  .route("/:id")	
	.put(updatePost)
	.delete(deletePost);

module.exports = router;
