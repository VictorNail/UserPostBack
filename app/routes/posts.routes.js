module.exports = (app) => {
  const Posts = require("../controllers/posts.controllers.js");

  var router = require("express").Router();

  // Create a new Posts
  router.post("/", Posts.create);

  // Get all Posts
  router.get("/", Posts.findAll);

  // Get Posts by ID
  router.get("/:id", Posts.findOne);

  // Get Posts by ID with this reactions
  router.get("/:id/reactions", Posts.findWithReactions);

  // Patch content of Posts
  router.patch("/:id", Posts.updateContent)

  app.use("/api/posts", router);
};
