const db = require("../models");
const Posts = db.Posts;
const Users = db.Users;
const Reactions = db.Reactions;
const Op = db.Sequelize.Op;

// Create and Save a new Posts
exports.create = (req, res) => {
       try {
            const { content, user_id } = req.body;
            Users.findOne({ where: { id: user_id } }).then(user => {
                if (user) {
                  Posts.create({ content, user_id }).then(posts => {
                    res.status(201).json(posts);
                  });
                } else {
                  res.status(500).json({ message: 'User does not exist' });
                }
              });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
};


// Find all Posts
exports.findAll = async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Find a single Posts by ID
exports.findOne = async (req, res) => {
  try {
    Posts.findOne({where: { id: req.params.id}}).then(post => {
      if(post){
        res.status(200).json(post);
      }
      else{
        res.status(500).json({ message: 'This post does not exist.' });
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//find a Post and this reactions
exports.findWithReactions = (req, res) => {
  try {
    Posts.findOne({where: { id: req.params.id}}).then(post => {
      if(post){
        Reactions.findAll({where: { post_id: req.params.id}}).then(reactions =>{
          if(reactions){
            const postWithReactions = {
              post: post,
              reactions: reactions
            }
            res.status(200).json(postWithReactions);
          }
        })
      }
      else{
        res.status(500).json({ message: 'This post does not exist.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateContent = (req, res) => {
  try {
    const { content } = req.body;
    Posts.update({ content: content }, {
      where: {
        id: req.params.id
      }
    }).then(posts =>{
      if(posts){
        res.status(200).json({ message:"Data updated"})
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};