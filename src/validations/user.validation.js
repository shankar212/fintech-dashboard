const Joi = require("joi");

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(6),
    role: Joi.string().valid("viewer", "analyst", "admin").optional(),
    isActive: Joi.boolean().optional(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    role: Joi.string().valid("viewer", "analyst", "admin"),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
  }),
};

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
      "string.pattern.base": "Invalid user ID format",
    }),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().trim(),
      email: Joi.string().email().trim(),
      password: Joi.string().min(6),
      role: Joi.string().valid("viewer", "analyst", "admin"),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
