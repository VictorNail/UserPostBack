module.exports = app => {
    const Reports = require("../controllers/reports.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new Reports
    router.post("/", Reports.create);
  
    router.get("/:id/posts", Reports.findByPostId);

    router.get("/:id/users", Reports.findByUserId);

    router.get("/users", Reports.userWithReports)

    router.delete("/", Reports.deleteOne);
  
    app.use('/api/reports', router);
  };