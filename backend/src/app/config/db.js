import mongoose from "mongoose";
import { dbURI } from "./env.js";

mongoose.set("strictQuery", false);

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(dbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			replicaSet: "rs0",
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default connectDB;
