const express = require('express');
const {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory
} = require('../controllers/categories');

const Category = require('../models/Category');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
	.route("/")
	.get(advancedResults(Category, "user"), getCategories);
router
	.route('/:id')
	.get(getCategory);

router
	.use(authorize("admin"))
	.route("/")
	.post(createCategory);

router
  .use(protect)
  .use(authorize("admin"))
  .route("/:id")
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
