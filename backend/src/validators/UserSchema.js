const Joi = require("joi");

const UserRegistrationSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().lowercase().required(),
  password: Joi.string().required(),
  gender: Joi.string().required().valid("male", "Male", "female", "Female"),
  department: Joi.string().required(),
});

const UserLoginSchema = Joi.object({
  email: Joi.string().lowercase().required(),
  password: Joi.string().required(),
});

const UserIdSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  UserRegistrationSchema,
  UserIdSchema,
  UserLoginSchema,
};
