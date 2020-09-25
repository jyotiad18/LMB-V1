const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Category = require('../models/Category');

// @desc      Get all categories
// @route     GET /api/v1/categories
// @access    Private/Admin
exports.getCategories = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc      Get single Category
// @route     GET /api/v1/categories/:id
// @access    Private/Admin
exports.getCategory = asyncHandler(async (req, res, next) => {
	const catgory = await Category.findById(req.params.id).populate('user');

	res.status(200).json({
		success: true,
		data: catgory
	});
});

// @desc      Create Category
// @route     POST /api/v1/Categories
// @access    Private/Admin
exports.createCategory = asyncHandler(async (req, res, next) => {	
	const catgory = await Category.create(req.body);

	res.status(201).json({
		success: true,
		data: catgory
	});
});

// @desc      Update Category
// @route     PUT /api/v1/Categories/:id
// @access    Private/Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
	const catgory = await Category.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
    success: true,
    data: catgory,
  });
});

// @desc      Delete Category
// @route     DELETE /api/v1/Categories/:id
// @access    Private/Admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {
	await Category.findByIdAndDelete(req.params.id);

	res.status(200).json({
		success: true,
		data: {}
	});
});
