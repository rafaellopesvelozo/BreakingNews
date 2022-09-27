const user = require("../models/user");

const create = (body) => user.create(body);

module.exports = {
  create,
};
