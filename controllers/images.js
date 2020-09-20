const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Image = require("../models/Image");

// @desc      Get all Image 
// @route     GET /api/v1/images
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

// @desc      Create Image
// @route     POST /api/v1/images
// @access    Private/Admin
exports.createImage = asyncHandler(async (req, res, next) => {
  const image = await Image.create(req.body);

  res.status(201).json({
    success: true,
    data: image,
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
