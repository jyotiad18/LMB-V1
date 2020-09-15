const path = require("path");
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
  let post = await (await Post.findById(req.params.id))
    .populate(["user", "category"]);
    /*.populate({
      path: "comments",
      match: { post: "5f5d4452335bee14f0f374ae" },
    });
   */
  
  const comments = await Comment.find({ post: req.params.id });
  post['comments'] = comments;

	res.status(200).json({
		success: true,
		data: post
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

// @desc      Upload photo for post
// @route     PUT /api/v1/posts/:id/photo
// @access    Private
exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  /*if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }   
  */

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }   
  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${post._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
    
    const photos = post['photos'];
    photos.push({ 'photo': file.name });
    
    await Post.findByIdAndUpdate(req.params.id, { photos: photos });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
