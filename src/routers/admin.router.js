import express from "express";
const Router = express.Router();

import { hashPassword } from "../helpers/bcrypt.helper.js";
import { newAdminUserFormValidation } from "../middlewares/formValidation.middleware.js";
import { createAdminUser } from "../models/user/User.model.js";

Router.get("/", (req, res) => {
	res.send("from get method of user");
});

//crate an admin user
Router.post("/", newAdminUserFormValidation, async (req, res, next) => {
	try {
		const { password } = req.body;
		req.body.password = hashPassword(password);
		const user = await createAdminUser(req.body);

		user._id
			? res.json({
					status: "success",
					message: "Admin user created successfully",
			  })
			: res.json({
					status: "error",
					message: "Error, Unable to crate an account please try again later",
			  });
	} catch (error) {
		if (error.message.includes("duplicate key error collection")) {
			error.status = 200;
			error.message = "Email already exists";
		}

		next(error);
	}
});

Router.patch("/", (req, res) => {});
Router.put("/", (req, res) => {});
Router.delete("/", (req, res) => {});

export default Router;
