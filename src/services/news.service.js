import News from "../models/New.js";

const createService = (body) => News.createService(body);
const findAllService = () => News.find();

export default {
  createService,
  findAllService,
};
