const express = require("express");
const auth = require("../middleware/auth");
const roleAuth = require("../middleware/role");
const dashboardController = require("../controllers/dashboard.controller");

const router = express.Router();

// Allowed for analysts and admins
router.get("/", auth, roleAuth("analyst", "admin"), dashboardController.getDashboardData);

module.exports = router;
