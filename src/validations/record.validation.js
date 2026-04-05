const Joi = require("joi");

const createRecord = {
  body: Joi.object().keys({
    amount: Joi.number().min(0).required(),
    type: Joi.string().valid("income", "expense").required(),
    category: Joi.string().required().trim(),
    date: Joi.date().iso().optional(),
    notes: Joi.string().trim().optional().allow(""),
  }),
};

const getRecords = {
  query: Joi.object().keys({
    type: Joi.string().valid("income", "expense"),
    category: Joi.string(),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso().min(Joi.ref("startDate")),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }),
};

const getRecord = {
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
};

const updateRecord = {
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
  body: Joi.object()
    .keys({
      amount: Joi.number().min(0),
      type: Joi.string().valid("income", "expense"),
      category: Joi.string().trim(),
      date: Joi.date().iso(),
      notes: Joi.string().trim().allow(""),
    })
    .min(1),
};

const deleteRecord = {
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
};

module.exports = {
  createRecord,
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord,
};
