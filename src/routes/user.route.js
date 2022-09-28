const route = require("express").Router();
const userController = require("../controllers/user.controller");

route.post("/", userController.create);
route.get("/", userController.findAllUser);

//buscar usuario por id
route.get("/:id", userController.findById);

module.exports = route;
