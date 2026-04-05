const Record = require("../models/Record");

const createRecord = async (recordData) => {
  const record = await Record.create(recordData);
  return record;
};

const queryRecords = async (filter, options) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  // Additional date filtering logic
  if (options.startDate && options.endDate) {
    filter.date = { $gte: new Date(options.startDate), $lte: new Date(options.endDate) };
  } else if (options.startDate) {
    filter.date = { $gte: new Date(options.startDate) };
  } else if (options.endDate) {
    filter.date = { $lte: new Date(options.endDate) };
  }

  const records = await Record.find(filter)
    .populate("createdBy", "name email")
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);
    
  const total = await Record.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  return { records, total, page, limit, totalPages };
};

const getRecordById = async (id) => {
  const record = await Record.findById(id).populate("createdBy", "name email");
  if (!record) {
    const error = new Error("Record not found");
    error.statusCode = 404;
    throw error;
  }
  return record;
};

const updateRecordById = async (id, updateBody) => {
  const record = await Record.findById(id);
  if (!record) {
    const error = new Error("Record not found");
    error.statusCode = 404;
    throw error;
  }
  Object.assign(record, updateBody);
  await record.save();
  return record;
};

const deleteRecordById = async (id) => {
  const record = await Record.findById(id);
  if (!record) {
    const error = new Error("Record not found");
    error.statusCode = 404;
    throw error;
  }
  await record.deleteOne();
  return record;
};

module.exports = {
  createRecord,
  queryRecords,
  getRecordById,
  updateRecordById,
  deleteRecordById,
};
