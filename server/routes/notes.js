const express = require("express");

const Router = express.Router();

// importing models
const Note = require("../models/Note");

Router.get("/", async (req, res, next) => {
	try {
		const notes = await Note.find();
		res.status(200).json(notes);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

Router.post("/", async (req, res, next) => {
	const { title, description } = req.body;
	const note = new Note({ title, description });
	try {
		await note.save();
		console.log(note);
		res.status(200).json(note);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

Router.put("/", async (req, res, next) => {
	const { _id, title, description } = req.body;
	try {
		const note = await Note.findById(_id);
		note.title = title;
		note.description = description;
		await note.save();
		res.status(200).json(note);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

Router.delete("/", async (req, res, next) => {
	const { _id } = req.body;
	try {
		await Note.deleteOne({ _id: _id });
		res.status(200).json(_id);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});
module.exports = Router;
