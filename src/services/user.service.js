const User = require("../models/user");

const create = (body) => User.create(body);
const findAllUser = () => User.find();
const findByIdService = (id) => User.findById(id);
const updateService = (
  id,
  name,
  username,
  email,
  password,
  avatar,
  background
) =>
  User.findOneAndUpdate(
    { _id: id },
    {
      name,
      username,
      email,
      password,
      avatar,
      background
    }
  );

module.exports = {
  create,
  findAllUser,
  findByIdService,
  updateService,
};
