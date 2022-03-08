const bcrypt = require("bcrypt");
const UserService = require("../services/UserServices");
const { appResponse } = require("../../lib/appResponse");
const { MSG_TYPES } = require("../../constants/types");
const { generateToken } = require("../utils/authTokenExplorer");

class UserCtrl {
  //Create a user
  async register(req, res) {
    try {
      let { email, password } = req.body;
      email = email.toLowerCase();
      req.body.email = email;
      const getUser = await UserService.findOne({ email });
      if (getUser) return appResponse(res, 409, MSG_TYPES.EMAIL_EXIST);

      const user = await UserService.register(req.body);
      const token = await generateToken(user);
      const data = { ...user.toJSON(), token };

      return appResponse(res, 201, MSG_TYPES.USER_CREATED, data);
    } catch (err) {
      return appResponse(res, 500, MSG_TYPES.SERVER_ERROR(err));
    }
  }

  //login user
  async login(req, res) {
    try {
      let { email, password } = req.body;
      email = email.toLowerCase();

      const user = await UserService.findOne({ email });
      if (!user) return appResponse(res, 409, MSG_TYPES.INVALID_CREDENTIALS);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return appResponse(res, 409, MSG_TYPES.INVALID_CREDENTIALS);

      const token = await generateToken(user);
      const data = { ...user.toJSON(), token };

      return appResponse(res, 200, MSG_TYPES.FETCHED, data);
    } catch (err) {
      return appResponse(res, 500, MSG_TYPES.SERVER_ERROR(err));
    }
  }

  //get all users
  async getAllUsers(req, res) {
    const users = await UserService.findAll();
    return appResponse(res, 200, MSG_TYPES.FETCHED, users);
  }

  //get one user
  async getOneUser(req, res) {
    const userId = req.params.id;
    const user = await UserService.findOne({ _id: userId });
    if (!user) return appResponse(res, 404, MSG_TYPES.USER_NOT_FOUND);
    return appResponse(res, 200, MSG_TYPES.FETCHED, user);
  }
}

module.exports = new UserCtrl();
