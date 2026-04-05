const recordService = require("../services/record.service");

const createRecord = async (req, res, next) => {
  try {
    const recordData = {
      ...req.body,
      createdBy: req.user._id,
    };
    const record = await recordService.createRecord(recordData);
    res.status(201).json({
      status: "success",
      data: { record },
    });
  } catch (error) {
    next(error);
  }
};

const getRecords = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.category) filter.category = req.query.category;
    
    const options = {
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      page: parseInt(req.query.page, 10),
      limit: parseInt(req.query.limit, 10),
    };

    const result = await recordService.queryRecords(filter, options);
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getRecord = async (req, res, next) => {
  try {
    const record = await recordService.getRecordById(req.params.id);
    res.json({
      status: "success",
      data: { record },
    });
  } catch (error) {
    next(error);
  }
};

const updateRecord = async (req, res, next) => {
  try {
    const record = await recordService.updateRecordById(req.params.id, req.body);
    res.json({
      status: "success",
      data: { record },
    });
  } catch (error) {
    next(error);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    await recordService.deleteRecordById(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecord,
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord,
};
