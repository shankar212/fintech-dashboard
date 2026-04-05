const express = require("express");
const auth = require("../middleware/auth");
const roleAuth = require("../middleware/role");
const validate = require("../middleware/validate");
const userValidation = require("../validations/user.validation");
const userController = require("../controllers/user.controller");

const router = express.Router();

// Only admins can manage users
router.use(auth, roleAuth("admin"));

router
  .route("/")
  .post(validate(userValidation.createUser), userController.createUser)
  .get(validate(userValidation.getUsers), userController.getUsers);

router
  .route("/:id")
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
