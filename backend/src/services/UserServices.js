const User = require("../models/UserModel");
class UserService {
  async register(data) {
    return await User.create(data);
  }

  async findById(id) {
    return await User.findById(id, "-__v");
  }

  async findOne(data) {
    return await User.findOne(data, "-__v");
  }

  async findAll(data) {
    data = data ?? {};
    return await User.find(data, "-__v").sort({createdAt: -1});
  }
}

module.exports = new UserService();
