const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Comment = require("../models/Comment");

// @desc      Get all Comment
// @route     GET /api/v1/comments
// @access    Private/Admin
exports.getComments = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single Comment
// @route     GET /api/v1/comments/:id
// @access    Private/Admin
exports.getComment = asyncHandler(async (req, res, next) => {
	const comment = await Comment.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc      Create Comment
// @route     POST /api/v1/comments
// @access    Private/Admin
exports.createComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.create(req.body);

  res.status(201).json({
    success: true,
    data: comment,
  });
});

// @desc      Update Comment
// @route     PUT /api/v1/comments/:id
// @access    Private/Admin
exports.updateComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc      Delete Comment
// @route     DELETE /api/v1/comments/:id
// @access    Private/Admin
exports.deleteComment = asyncHandler(async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
