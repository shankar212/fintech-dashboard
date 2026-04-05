const express = require("express");
const auth = require("../middleware/auth");
const roleAuth = require("../middleware/role");
const validate = require("../middleware/validate");
const recordValidation = require("../validations/record.validation");
const recordController = require("../controllers/record.controller");

const router = express.Router();

// Analysts and Admins can manage all records
// Viewers could theoretically read, but for simplicity, we adhere to role specs:
// analyst: read + dashboard
// admin: full access
// Wait, if an 'analyst' can only read, they shouldn't POST/PATCH/DELETE.
// Let's refine role access based on specs:
// viewer: read-only
// analyst: read + dashboard insights
// admin: full access

// Read access for everyone who is at least a viewer (viewer, analyst, admin)
router.get("/", auth, validate(recordValidation.getRecords), recordController.getRecords);
router.get("/:id", auth, validate(recordValidation.getRecord), recordController.getRecord);

// Write access only to admin (based on the instruction 'analyst: read + dashboard insights', 'admin: full access')
router.post("/", auth, roleAuth("admin"), validate(recordValidation.createRecord), recordController.createRecord);
router.patch("/:id", auth, roleAuth("admin"), validate(recordValidation.updateRecord), recordController.updateRecord);
router.delete("/:id", auth, roleAuth("admin"), validate(recordValidation.deleteRecord), recordController.deleteRecord);

module.exports = router;
