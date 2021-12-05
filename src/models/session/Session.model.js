import SessionSchema from "./Session.schema.js";

export const storeAccessJWT = obj => {
	return SessionSchema(obj).save();
};

export const getAccessJWT = filter => {
	return SessionSchema.findOne(filter);
};

export const deleteSessionToken = filter => {
	return SessionSchema.findOneAndDelete(filter);
};
