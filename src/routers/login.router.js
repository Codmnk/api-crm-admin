import express from "express";
const Router = express.Router();

import { comparePassword } from "../helpers/bcrypt.helper.js";
import {
	createAccessToken,
	createRefreshToken,
} from "../helpers/jwt.helper.js";
import { loginAdminUserFormValidation } from "../middlewares/formValidation.middleware.js";
import { getAadminUser } from "../models/user/User.model.js";

//crate an admin user
Router.post("/", loginAdminUserFormValidation, async (req, res, next) => {
	try {
		const { email, password } = req.body;

		//
		//get user by email
		const user = await getAadminUser({ email });
		if (user?._id) {
			// check if passwords match
			const matched = comparePassword(password, user.password);
			if (matched) {
				// crate  tokens and store them in the database
				const accessJWT = await createAccessToken(user._id, user.email);
				const refreshJWT = await createRefreshToken(user._id, user.email);

				//return the token
				return res.json({
					status: "success",
					accessJWT,
					refreshJWT,
				});
			}
		}

		res.json({
			status: "error",
			message: "Error, Invalid credentials",
		});
	} catch (error) {
		next(error);
	}
});

export default Router;
