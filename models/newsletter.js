var mongoose=require('mongoose');

var newsletterSchema= new mongoose.Schema({
	title: String,
	image: String,
	writer: String,
	date: {type: Date, default:Date.now},
	content: String
});

module.exports= mongoose.model('newsletter', newsletterSchema);