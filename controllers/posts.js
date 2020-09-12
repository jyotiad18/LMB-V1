const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// @desc      Get all Post
// @route     GET /api/v1/posts
// @access    Private/Admin
exports.getPosts = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc      Get single Post
// @route     GET /api/v1/posts/:id
// @access    Private/Admin
exports.getPost = asyncHandler(async (req, res, next) => {
	const post = await (await Post.findById(req.params.id))
		.populate(['user', 'category']);
	
	const comments = await Comment.find({ 'post': req.params.id });
	const data = {
		...post,
		comments}

	res.status(200).json({
		success: true,
		data: data
	});
});

// @desc      Create Post
// @route     POST /api/v1/posts
// @access    Private/Admin
exports.createPost = asyncHandler(async (req, res, next) => {
  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    data: post,
  });
});

// @desc      Update Post
// @route     PUT /api/v1/posts/:id
// @access    Private/Admin
exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc      Delete Post
// @route     DELETE /api/v1/Posts/:id
// @access    Private/Admin
exports.deletePost = asyncHandler(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
