import http from "http";
import app from "./app.js";
import connectDB from "./app/config/db.js";
import { port } from "./app/config/env.js";

const server = http.createServer(app);

connectDB().then(
	server.listen(port, () => console.log(`App running at port: ${port}`))
);
