const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Image = require("../models/Image");
const Post = require("../models/Post");

// @desc      Update like for images
// @route     PUT /api/v1/likes/images/:id
exports.updateImage = asyncHandler(async (req, res, next) => {
	console.log(req.params.id);
	const _id = req.params.id;

	const image = await Image.findById(_id);
	const likes = image.likes + 2;	
	const result = await Image.findByIdAndUpdate(_id, { likes });
    res.status(200).json({
      success: true,
      data: result,
    });
});

// @desc      Update like for post
// @route     PUT /api/v1/likes/posts/:id
exports.updatePost = asyncHandler(async (req, res, next) => {
	const _id = req.params.id;
	const post = await Post.findById(_id);
	const result = await Post.findByIdAndUpdate(_id, { likes: post.likes + 2 });
    res.status(200).json({
      success: true,
      data: result,
    });
});