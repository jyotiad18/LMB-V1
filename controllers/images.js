const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Image = require("../models/Image");
const Post = require('../models/Post');


// @desc      Get all imaages
// @route     GET /api/v1/:postid/images
// @access    Private/Admin
exports.getImages = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc      Get single Image
// @route     GET /api/v1/images/:id
// @access    Private/Admin
exports.getImage = asyncHandler(async (req, res, next) => {
  const image = await Image.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: image,
  });
});

// @desc      Create Image of Post 
// @route     POST /api/v1/:postid/images
// @access    Private/Admin
exports.createImage = asyncHandler(async (req, res, next) => {
  const postId = req.params.postid;  
  const post = await Post.findById(postId);  
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
    const image = await Image.create({
      name: file.name,
      description: req.body.description,
      user: req.body.user
    });    
    const photos = post.photos;
    photos.push({ photo: image._id });
    await Post.findByIdAndUpdate(postId, { photos });
    res.status(200).json({
      success: true,
      data: image
    });
  });   
});

// @desc      Update Image
// @route     PUT /api/v1/images/:id
// @access    Private/Admin
exports.updateImage = asyncHandler(async (req, res, next) => {
  const image = await Image.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: image,
  });
});

// @desc      Delete Image
// @route     DELETE /api/v1/images/:id
// @access    Private/Admin
exports.deleteImage = asyncHandler(async (req, res, next) => {
  await Image.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
