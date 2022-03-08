const router = require("express").Router();
const userCtrl = require("../controllers/UserController");
const joiValidator = require("../validators/index");
const { identify } = require("../middlewares/authMiddleware");
const {
  UserRegistrationSchema,
  UserIdSchema,
  UserLoginSchema,
} = require("../validators/UserSchema");

module.exports = function () {
  router.post(
    "/users/register",
    joiValidator(UserRegistrationSchema),
    userCtrl.register
  );

  router.post("/users/login", joiValidator(UserLoginSchema), userCtrl.login);

  router.get("/users", identify, userCtrl.getAllUsers);

  router.get(
    "/users/:id",
    joiValidator(UserIdSchema, "params"),
    identify,
    userCtrl.getOneUser
  );

  router.get(
    "/users/view-profile/me",
    identify,
    userCtrl.viewProfile
  );

  return router;
};
