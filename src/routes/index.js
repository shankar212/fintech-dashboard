const express = require("express");
const authRoute = require("./auth.routes");
const userRoute = require("./user.routes");
const recordRoute = require("./record.routes");
const dashboardRoute = require("./dashboard.routes");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/records",
    route: recordRoute,
  },
  {
    path: "/dashboard",
    route: dashboardRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
