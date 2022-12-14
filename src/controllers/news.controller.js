import {
  createService,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
  eraseService,
  likeNewsService,
  deleteLikeNewsService,
} from "../services/news.service.js";

export const create = async (req, res) => {
  try {
    const { title, banner, text } = req.body;

    if (!title || !banner || !text) {
      res.status(400).send({ message: "submit all fields for registration" });
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;
    limit = Number(limit);
    offset = Number(offset);
    if (!limit) {
      limit = 5;
    }
    if (!offset) {
      offset = 0;
    }
    const news = await findAllService(offset, limit);
    const total = await countNews();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (news.length === 0) {
      return res.status(400).send({ message: "there are no registered news" });
    }
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const topNews = async (req, res) => {
  try {
    const news = await topNewsService();
    if (!news) {
      return res.status(400).send({ message: "there is no registered post" });
    }
    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await findByIdService(id);
    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const news = await searchByTitleService(title);
    if (news.length === 0) {
      return res
        .status(400)
        .send({ message: "there are no news with this title" });
    }
    return res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserService(id);

    return res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner) {
      res
        .status(400)
        .send({ message: "submit at last one field to update the post" });
    }

    const news = await findByIdService(id);

    if (String(news.user._id) !== req.userId) {
      res.status(400).send({ message: "you didn??t update this post" });
    }
    await updateService(id, title, text, banner);

    res.send({ message: "post succesfully update" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const erase = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findByIdService(id);

    if (String(news.user._id) !== req.userId) {
      res.status(400).send({ message: "you didn??t delete this news" });
    }
    await eraseService(id);

    return res.send({ message: "News deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const likeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const newsLiked = await likeNewsService(id, userId);

    if (!newsLiked) {
      await deleteLikeNewsService(id, userId);
      return res.status(200).send({ message: "like successfully removed" });
    }

    res.send({ message: "like done successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
