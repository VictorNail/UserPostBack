const db = require("../models");
const Users = db.Users;
const Reactions = db.Reactions;
const Posts = db.Posts;
const Op = db.Sequelize.Op;

// Create and Save a new Users
exports.create = (req, res) => {
  try {
    const { username, first_name, last_name, email } = req.body;
    const users = Users.create({ username, first_name, last_name, email });
    res.status(201).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Find all Users
exports.findAll = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Find a single User by ID
exports.findOne = async (req, res) => {
  try {
    Users.findOne({ where: { id: req.params.id } }).then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(500).json({ message: "This user does not exist." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Find User with Posts and Reactions by ID
exports.findContent = async (req, res) => {
  try {
    Users.findOne({ where: { id: req.params.id } }).then((user) => {
      if (user) {
        Posts.findAll({ where: { user_id: req.params.id } }).then((posts) => {
          if (posts) {
            Reactions.findAll({ where: { user_id: req.params.id } }).then(
              (reactions) => {
                const result = {
                    user:user,
                    posts: posts,
                    reactions: reactions,
                };
                res.status(200).json(result);
              }
            );
          }
        });
      } else {
        res.status(500).json({ message: "This post does not exist." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
