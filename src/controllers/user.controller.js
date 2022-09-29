import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//buscar todos os usuario
const findAllUser = async (req, res) => {
  try {
    const users = await userService.findAllUser();

    if (users.length === 0) {
      return res.status(400).send({ message: "there are no registared users" });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//buscar usuario por id
const findById = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//atualizar usuário
const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      res
        .status(400)
        .send({ message: "submuit at least onde field for update" });
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
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default {
  create,
  findAllUser,
  findById,
  update,
};
