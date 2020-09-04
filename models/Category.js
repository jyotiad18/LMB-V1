const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		unique: true,
		required: [true, 'Please add a category title'],
		maxlength: [50, 'title can not be more than 50 characters']
	},
	description: {
		type: String,
		required: [true, 'Please add a description']
	},	
	createdAt: {
		type: Date,
		default: Date.now
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = mongoose.model('Catgory', CategorySchema);
