var mongoose= require('mongoose');

var gdSchema= new mongoose.Schema({
	topic: String,
	image: String,
	participants: Number,
	date: {type: Date, default:Date.now},
	subtopic: {
		title: String,
		content: String
	}
})

module.exports= mongoose.model('gd', gdSchema);