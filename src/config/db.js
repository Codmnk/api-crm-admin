import mongoose from "mongoose";

const mongoClient = async () => {
	try {
		const mongoUrl = process.env.MONGO_URL;
		if (!mongoUrl) {
			return console.log(
				"Please provide mongo connection string in .env file for MONGO_URL"
			);
		}

		const con = await mongoose.connect(mongoUrl);

		con && console.log("connected to mongo");
	} catch (error) {
		console.log(error);
	}
};

export default mongoClient;
