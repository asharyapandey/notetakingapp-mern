const express = require("express");

const Router = express.Router();

// importing models
const Note = require("../models/Note");
const User = require("../models/User");

// veryfing middleware
const auth = require("../authMiddleware");
const mongoose = require("mongoose");

Router.get("/", auth, async (req, res, next) => {
	try {
		const notes = await Note.find({
			userID: mongoose.mongo.ObjectID(req.user.id),
		});
		res.status(200).json(notes);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

Router.post("/", auth, async (req, res, next) => {
	const { title, description } = req.body;
	const note = new Note({
		title,
		description,
		userID: mongoose.mongo.ObjectId(req.user.id),
	});
	try {
		await note.save();
		res.status(200).json(note);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

Router.put("/", auth, async (req, res, next) => {
	const { _id, title, description } = req.body;
	try {
		const note = await Note.findById(_id);
		if (note.userID == req.user.id) {
			note.title = title;
			note.description = description;
			await note.save();
			res.status(200).json(note);
		} else {
			res.status(401).json({ msg: "access denied" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

Router.delete("/", auth, async (req, res, next) => {
	const { _id } = req.body;
	try {
		const note = await Note.findById(_id);
		if (note.userID == req.user.id) {
			await Note.deleteOne({ _id: _id });
			res.status(200).json(_id);
		} else {
			res.status(401).json({ msg: "access denied" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});
module.exports = Router;
