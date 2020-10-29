const express = require("express");

const router = express.Router();

// importing the model

const User = require("../models/User");

// importing jwt
const jwt = require("jsonwebtoken");

const auth = require("../authMiddleware");
const TOKEN = require("../keys").TOKEN;

router.post("/register", async (req, res, next) => {
	const { username, email, password } = req.body;
	const user = new User({ username, email, password });

	try {
		await user.save();
		res.status(200).json(user);
	} catch (err) {
		res.status(400).json({ err: "invalid credentials" });
		console.log(err);
	}
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username, password });
		if (user) {
			const token = jwt.sign({ id: user.id }, TOKEN, {
				expiresIn: 3600,
			});
			res.json({ token, user });
		} else {
			res.json({ error: "User not found" });
		}
	} catch (err) {
		console.log(err);
	}
});

router.get("/user", auth, async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (error) {
		res.status(400).json({ msg: "error!!! Invalid Token" });
	}
});
module.exports = router;
