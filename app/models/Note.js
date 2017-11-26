const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let NoteSchema = new Schema({
	text: {
		type: String,
		require: true
	}
});

let Note = mongoose.model("Note", NoteSchema);

module.exports = Note;