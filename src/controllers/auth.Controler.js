import bcrypt from "bcryptjs";
import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginService(email);

    if (!user) {
      return res.status(404).send({ message: "User or password not found" });
    }

    //'compareSync' ou uso o "await"
    const passwordIsvalid = bcrypt.compareSync(password, user.password);

    if (!passwordIsvalid) {
      return res.status(404).send({ message: "User or password not found" });
    }

    const token = generateToken(user.id)

    res.send({token});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { login };
