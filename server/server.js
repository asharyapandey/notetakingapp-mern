const express = require("express");

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res, next) => {
	res.send("hello");
});

// defining routes
app.use("/api/notes", require("./routes/notes"));

// connecting mongodb
require("./mongodb")();

app.listen(5000, () => console.log("API at http://localhost:5000/"));
