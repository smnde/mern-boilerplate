import jwt from "jsonwebtoken";
import { accessTokenKey, refreshTokenKey } from "../config/env.js";

/**
 * @param {Object} payload
 * @returns {String | Error}
 * @description Generate access token
 * @note Access token is valid for 15 minutes
 */
export const generateAccessToken = (payload) => {
	try {
		return jwt.sign(payload, accessTokenKey, { expiresIn: "15m" });
	} catch (error) {
		return error;
	}
};

/**
 * @param {Object} payload
 * @returns {String | Error}
 * @description Generate refresh token
 * @note Refresh token is valid for 1 day
 */
export const generateRefreshToken = (payload) => {
	try {
		return jwt.sign(payload, refreshTokenKey, { expiresIn: "1d" });
	} catch (error) {
		return error;
	}
};
