import express from "express";
import UsersService from "../services/users.services.js";

const router = express.Router();

router.get("/", async (req, res) => {
	res.status(200).send("Hello World!");
});

router.get("/users", UsersService.index);
router.get("/users/:id", UsersService.show);
router.post("/users", UsersService.store);
router.put("/users/:id", UsersService.update);
router.delete("/users/:id", UsersService.destroy);

export default router;
