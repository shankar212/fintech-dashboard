const express = require("express");
const auth = require("../middleware/auth");
const roleAuth = require("../middleware/role");
const dashboardController = require("../controllers/dashboard.controller");

const router = express.Router();

// Allowed for all active roles (viewer, analyst, admin)
router.get("/", auth, roleAuth("viewer", "analyst", "admin"), dashboardController.getDashboardData);

module.exports = router;
