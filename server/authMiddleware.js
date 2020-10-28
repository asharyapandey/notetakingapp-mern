const jwt = require("jsonwebtoken");

const TOKEN_KEY = require("./keys").TOKEN;

function auth(req, res, next) {
	const token = req.header("auth-token");

	if (!token) res.status(401).json({ msg: "error! token not found" });

	try {
		const decoded = jwt.verify(token, TOKEN_KEY);
		// add the user from the payload to the request
		req.user = decoded;
	} catch (error) {
		res.status(400).json({ msg: "error!!! Invalid Token" });
	}
	next();
}

module.exports = auth;
