const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/notes";

const connectMongo = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB Connected");
	} catch (err) {
		console.error(err);
	}
};

module.exports = connectMongo;
