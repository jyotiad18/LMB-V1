const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Image = require("../models/Image");
const Post = require("../models/Post");

// @desc      Update likes for images
// @route     PUT /api/v1/images/:imageid/likes
exports.updateImageLikes = asyncHandler(async (req, res, next) => {
  const _id = req.params.imageid;

  const image = await Image.findById(_id);
  const likes = image.likes + 2;
  const result = await Image.findByIdAndUpdate(_id, { likes });
  res.status(200).json({
    success: true,
    data: result,
  });
});

// @desc      Update like for post
// @route     PUT /api/v1/posts/:postid/likes
exports.updatePostLikes = asyncHandler(async (req, res, next) => {
  const _id = req.params.id;
  const post = await Post.findById(_id);
  const result = await Post.findByIdAndUpdate(_id, { likes: post.likes + 2 });
  res.status(200).json({
    success: true,
    data: result,
  });
});