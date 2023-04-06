module.exports = app => {
  const Reactions = require("../controllers/reactions.controllers.js");

  var router = require("express").Router();

  // Create a new Reactions
  router.post("/", Reactions.create);

  
  // Get all Reactions
  router.get("/", Reactions.findAll);


  app.use('/api/reactions', router);
};