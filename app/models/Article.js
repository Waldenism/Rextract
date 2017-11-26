const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({

	title: {
		type: String,
		required: true,
		unique: true
	},
	link: {
		type: String,
		required: true
	},
	notes: [{
		type: Schema.Types.ObjectId,
		ref: "Note"
	}]
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;