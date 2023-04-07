const db = require("../models");
const Reports = db.Reports;
const Posts = db.Posts;
const Users = db.Users;

const Op = db.Sequelize.Op;

// Create and Save a new Reports
exports.create = (req, res) => {
  try {
    const { user_id, post_id, reason } = req.body;
    Posts.findOne({ where: { id: post_id } }).then((post) => {
      if (post) {
        Users.findOne({ where: { id: user_id } }).then((user) => {
          if (user) {
            Reports.create({
              user_id: user_id,
              post_id: post_id,
              reason: reason,
            }).then((report) => {
              res.status(201).json(report);
            });
          }
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

exports.findByUserId = (req, res) =>{
  try{
    Reports.findAll({ where: { user_id: req.params.id } }).then((reports)=>{
      if(reports){
        res.status(201).json(reports);
      }
      else{
        res.status(500).json({ message: "No report for this user" });
      }
    })
  } catch (error){
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


exports.findByPostId = (req,res) =>{
  try{
    Reports.findAll({ where: { post_id: req.params.id } }).then((reports)=>{
      if(reports){
        res.status(201).json(reports);
      }
      else{
        res.status(500).json({ message: "No report for this Post" });
      }
    })
  } catch (error){
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.userWithReports = async (req, res) => {
  try{
    const reports = await Reports.findAll();
    const reportsID = reports.map((report) => report.user_id);
    const users = await Users.findAll({ where: { id: { [Op.in]: reportsID } } });
    res.json(users);
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteOne = (req, res) => {
  try{
    const { user_id, post_id } = req.body;
    if(Reports.findOne({where:{user_id:user_id,post_id:post_id}})){
      Reports.destroy({where:{user_id:user_id,post_id:post_id}});
      res.status(200).json({ message: "Report destroy"});
    }
  } catch (error){
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
