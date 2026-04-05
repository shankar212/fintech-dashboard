const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    const error = new Error("Email already taken");
    error.statusCode = 400;
    throw error;
  }
  const user = await User.create(userData);
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !user.isActive) {
    const error = new Error("Incorrect email or password, or account inactive");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.isPasswordMatch(password);
  if (!isMatch) {
    const error = new Error("Incorrect email or password");
    error.statusCode = 401;
    throw error;
  }

  return user;
};

const generateAuthToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  register,
  login,
  generateAuthToken,
};
