const dashboardService = require("../services/dashboard.service");

const getDashboardData = async (req, res, next) => {
  try {
    // Parallelizing independent queries
    const [overview, categoryTotals, trends, recentTransactions] = await Promise.all([
      dashboardService.getOverview(),
      dashboardService.getCategoryTotals(),
      dashboardService.getMonthlyTrends(),
      dashboardService.getRecentTransactions(5),
    ]);

    res.json({
      status: "success",
      data: {
        overview,
        categoryTotals,
        trends,
        recentTransactions,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardData,
};
