import CryptoJs from "crypto-js";
import { passwordKey } from "../config/env.js";

/**
 * @param {string} password
 * @returns {string <encrypted password>}
 * @description Encrypt user password
 * @access Public
 */
export const encryptPassword = (password) => {
	return CryptoJs.AES.encrypt(password, passwordKey).toString();
};

/**
 * @param {string} encryptedPassword
 * @returns {boolean}
 * @description validate the password === encryptedPassword
 * @access Public
 */
export const verifyPassword = (password, encryptedPassword) => {
	return (
		CryptoJs.AES.decrypt(encryptedPassword, passwordKey).toString(
			CryptoJs.enc.Utf8
		) === password
	);
};

// export const verifyPassword = (encryptPassword) => {
// 	return CryptoJs.AES.decrypt(encryptPassword, passwordKey).toString(
// 		CryptoJs.enc.Utf8
// 	);
// };
