const User = require("../models/user");

const create = (body) => User.create(body);
const findAllUser = () => User.find();
const findByIdService = (id) => User.findById(id);

module.exports = {
  create,
  findAllUser,
  findByIdService,
};
