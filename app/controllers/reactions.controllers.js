const db = require("../models");
const Reactions = db.Reactions;
const Posts = db.Posts;
const Op = db.Sequelize.Op;

// Create and Save a new Reactions
exports.create = (req, res) => {
  try {
    const { user_id, post_id, type } = req.body;
    Posts.findOne({ where: { id: post_id, user_id: user_id } }).then((post) => {
      if (post) {
        Reactions.create({ user_id:user_id, post_id:post_id, type:type }).then((reactions) => {
          res.status(201).json(reactions);
        });
      } else {
        res.status(500).json({ message: "Posts does not exist" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Find all Users
exports.findAll = async (req, res) => {
  try {
    const reactions = await Reactions.findAll();
    res.status(200).json(reactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};