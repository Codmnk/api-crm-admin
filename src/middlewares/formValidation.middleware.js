import Joi from "joi";

const fName = Joi.string().max(30).required();
const lName = Joi.string().max(30).required();
const email = Joi.string().email({ minDomainSegments: 2 });
const phone = Joi.string().max(15).required();
const password = Joi.string().max(50).required();

export const newAdminUserFormValidation = (req, res, next) => {
	try {
		const schema = Joi.object({
			fName,
			lName,
			email,
			phone,
			password,
		});

		const { error } = schema.validate(req.body);

		if (error) {
			error.status = 200;
			return next(error);
		}
		next();
	} catch (error) {
		next(error);
	}
};
