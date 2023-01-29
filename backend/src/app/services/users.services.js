import User from "../schemas/users.schemas.js";
import { encryptPassword } from "../helpers/password.helper.js";

const UsersService = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @return {Promise <Response>}
	 * @description Get all users
	 * @route GET /api/v1/users
	 * @access Private
	 * @middleware auth
	 * @role admin
	 */
	index: async (req, res) => {
		try {
			const users = await User.find();
			return res.status(200).json(users);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @return {Promise <Response>}
	 * @description Get a user by id
	 * @route GET /api/v1/users/:id
	 * @access Private
	 * @middleware auth
	 * @role admin
	 */
	show: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			return res.status(200).json(user);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @return {Promise <Response>}
	 * @description Create a user
	 * @route POST /api/v1/users
	 * @access Private
	 * @middleware auth
	 * @role admin
	 */
	store: async (req, res) => {
		const { name, username, email, role, password } = req.body;

		const credentials = new User({
			name,
			username,
			email,
			role,
			password: encryptPassword(password),
		});

		try {
			const user = await User.findOne({ $or: [{ username }, { email }] });
			if (user) return res.status(400).json({ message: "User already exists" });

			const newUser = await credentials.save();

			return res
				.status(201)
				.json({ message: "User created successfully", newUser });
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @return {Promise <Response>}
	 * @description Update a user
	 * @route PUT /api/v1/users/:id
	 * @access Private
	 * @middleware auth
	 * @role admin
	 */
	update: async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
			if (!user) return res.status(404).json({ message: "User not found" });

			return res
				.status(200)
				.json({ message: "User updated successfully", user });
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @return {Promise <Response>}
	 * @description Delete a user
	 * @route DELETE /api/v1/users/:id
	 * @access Private
	 * @middleware auth
	 * @middleware admin
	 */
	destroy: async (req, res) => {
		try {
			const user = await User.findByIdAndDelete(req.params.id);
			if (!user) return res.status(404).json({ message: "User not found" });

			return res
				.status(200)
				.json({ success: true, message: "User deleted successfully" });
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},
};

export default UsersService;
