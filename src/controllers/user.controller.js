const userService = require("../services/user.service");

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
  const users = await userService.findAllUser();

  if (users.length === 0) {
    return res.status(400).send({ message: "there are no registared users" });
  }

  res.send(users);
};

//buscar usuario por id
const findById = async (req, res) => {
  const user = req.user;

  res.send(user);
};

//atualizar usuário
const update = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  if (!name && !username && !email && !password && !avatar && !background) {
    res.status(400).send({ message: "submuit at least onde field for update" });
  }

  const { id, user } = req;

  await userService.updateService(
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
  );

  res.send({ message: "user successfully updated" });
};

module.exports = {
  create,
  findAllUser,
  findById,
  update,
};
