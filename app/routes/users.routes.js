module.exports = app => {
  const Users = require("../controllers/users.controllers.js");

  var router = require("express").Router();

  // Create a new Users
  router.post("/", Users.create);

  // Get all Users
  router.get("/", Users.findAll);

  // Get User by ID
  router.get("/:id", Users.findOne);

  // Get User with Posts with Reactions
  router.get("/:id/contents", Users.findContent);


  app.use('/api/users', router);
};