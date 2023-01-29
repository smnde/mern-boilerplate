import jwt from "jsonwebtoken";
import { accessTokenKey, refreshTokenKey, keyName } from "../config/env.js";
import User from "../schemas/users.schemas.js";

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 * @description Verify access token
 * @access Public
 */
export const verifyAccessToken = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(405).send({ message: "No token provided!" });

	jwt.verify(token, accessTokenKey, (err, decoded) => {
		if (err) return res.status(405).send({ message: "Invalid token!" });

		req.userId = decoded.id;
		next();
	});
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 * @description Verify refresh token
 * @access Public
 */
export const verifyRefreshToken = (req, res, next) => {
	const token = req.cookies[String(keyName)];

	if (!token) return res.status(401).send("Unauthorized!");

	jwt.verify(token, refreshTokenKey, async (err, decoded) => {
		if (err) return res.status(401).send("Unauthorized!");

		const user = await User.findById(decoded.id).select("+token");
		const validToken = user.token.find(
			(refreshToken) => refreshToken === token
		);
		if (!validToken) return res.status(401).send("Unauthorized!");

		req.userId = decoded.id;
		next();
	});
};
