const userService = require("../services/user.service");
const mongoose = require("mongoose");
const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  if (!name || !username || !email || !password || !avatar || !background) {
    res.status(400).send({ message: "submuit all fields for registration" });
  }

  const user = await userService.create(req.body); // servico de usuário

  if (!user) {
    return res.status(400).send({ message: "Error creating user" });
  }

  res.status(201).send({
    message: "user created successfully",
    user: {
      id: user._id,
      name,
      username,
      email,
      avatar,
      background,
    },
  });
};

//buscar todos os usuario
const findAllUser = async (req, res) => {
  const user = await userService.findAllUser();
  if (user.length === 0) {
    return res.status(400).send({ message: "there are no registared users" });
  }
  res.send(user);
};

//buscar usuario por id
const findById = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID" });
  }
  const user = await userService.findByIdService(id);
  if (!user) {
    return res.status(400).send({ message: "user not found" });
  }

  res.send(user);
};
module.exports = {
  create,
  findAllUser,
  findById,
};
