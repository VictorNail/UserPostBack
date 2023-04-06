const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//test de connexion
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/reactions.routes")(app);
require("./app/routes/posts.routes")(app);
require("./app/routes/users.routes")(app);

const faker = require("./app/faker");
//tester si la base est vide
/*
async function isDatabaseEmpty() {
  const tables = [db.Users, db.Posts, db.Reactions]; // Remplacez par les noms de vos tables
  const counts = await Promise.all(tables.map(table => {
    return db.query(`SELECT COUNT(*) as count FROM ${table}`);
  }));
  return counts.every(result => result[0][0].count === 0);
}

isDatabaseEmpty().then(result => {
  console.log(`La base de données est vide : ${result}`);
});*/
const initData = true;


async function checkFakerTable() {
  const user = await db.Users.findAll();
  const post = await db.Posts.findAll();
  const reactions = await db.Reactions.findAll();
  //if (user.length === 0)faker.generateUsers(1000);
  //if (post.length === 0)faker.generatePosts(10);
  if (reactions.length === 0)faker.generateReactions(10);
}

checkFakerTable();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
