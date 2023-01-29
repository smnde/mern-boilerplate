import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UsersSchema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	role: { type: String, required: true },
	password: { type: String, required: true, select: false },
	token: { type: [], select: false },
});

export default model("User", UsersSchema);
