const Record = require("../models/Record");

const getOverview = async () => {
  const totals = await Record.aggregate([
    {
      $group: {
        _id: "$type",
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0;
  let expense = 0;

  totals.forEach((t) => {
    if (t._id === "income") income = t.totalAmount;
    if (t._id === "expense") expense = t.totalAmount;
  });

  return {
    totalIncome: income,
    totalExpenses: expense,
    netBalance: income - expense,
  };
};

const getCategoryTotals = async () => {
  const totals = await Record.aggregate([
    {
      $group: {
        _id: { type: "$type", category: "$category" },
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $group: {
        _id: "$_id.type",
        categories: {
          $push: {
            category: "$_id.category",
            amount: "$totalAmount",
          },
        },
      },
    },
  ]);

  const result = { income: [], expense: [] };
  totals.forEach((t) => {
    result[t._id] = t.categories;
  });

  return result;
};

const getMonthlyTrends = async () => {
  const trends = await Record.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  // Map to a more readable structure
  const formattedTrends = trends.map((t) => ({
    year: t._id.year,
    month: t._id.month,
    type: t._id.type,
    amount: t.totalAmount,
  }));

  return formattedTrends;
};

const getRecentTransactions = async (limit = 5) => {
  const records = await Record.find()
    .sort({ date: -1 })
    .limit(limit)
    .populate("createdBy", "name email");
  return records;
};

module.exports = {
  getOverview,
  getCategoryTotals,
  getMonthlyTrends,
  getRecentTransactions,
};
