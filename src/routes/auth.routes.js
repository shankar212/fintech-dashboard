const express = require("express");
const authValidation = require("../validations/auth.validation");
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validate");

const router = express.Router();

router.post("/register", validate(authValidation.register), authController.register);
router.post("/login", validate(authValidation.login), authController.login);

module.exports = router;
