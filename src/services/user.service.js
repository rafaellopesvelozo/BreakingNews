import User from "../models/user.js";

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

export default {
  create,
  findAllUser,
  findByIdService,
  updateService,
};
