import AdminUserSchema from "./User.schema.js";

// Create user
export const createAdminUser = obj => {
	return AdminUserSchema(obj).save();
};

// get user by id
export const getAdminUserById = _id => {
	return AdminUserSchema.findById(_id);
};

// get one user by filter
export const getAadminUser = filter => {
	return AdminUserSchema.findOne(filter);
};

// get all users by filter
export const getAllAdminUsers = filter => {
	return AdminUserSchema.find(filter);
};

// Update user
export const updateAAdminUser = (filter, obj) => {
	return AdminUserSchema.findOneAndUpdate(filter, obj, { new: true });
};

// Delete user
export const deleteAadminUsers = filter => {
	return AdminUserSchema.findOneAndDelete(filter);
};
