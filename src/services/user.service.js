const User = require("../models/User");

const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    const error = new Error("Email already taken");
    error.statusCode = 400;
    throw error;
  }
  const user = await User.create(userData);
  return user;
};

const queryUsers = async (filter, options) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  const users = await User.find(filter).skip(skip).limit(limit).select("-password");
  const total = await User.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  return { users, total, page, limit, totalPages };
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

const updateUserById = async (id, updateBody) => {
  const user = await User.findById(id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  if (updateBody.email && (await User.findOne({ email: updateBody.email, _id: { $ne: id } }))) {
    const error = new Error("Email already taken");
    error.statusCode = 400;
    throw error;
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  // Soft delete logic or hard delete depending on requirement, going with hard delete
  await user.deleteOne();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
