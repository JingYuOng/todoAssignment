const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
	name : {
		type : String,
		required: true
	},
	dateTime : {
		type : String,
		required : true
	},
	isCompleted : {
		type : Boolean,
		required : true
	}
})

module.exports = mongoose.model('Task', taskSchema);