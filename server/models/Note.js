const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
	title: String,
	description: String,
	userID: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = mongoose.model("Note", noteSchema);
