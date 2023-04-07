const { faker } = require("@faker-js/faker");
const db = require("./models");
const Users = db.Users;
const Posts = db.Posts;
const Reactions = db.Reactions;
const Reports = db.Reports;

exports.generateUsers = async function (numberOfUsers) {
  for (let i = 0; i < numberOfUsers; i++) {
    try {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      await Users.create({
        username: faker.internet.userName(firstName, lastName),
        first_name: firstName,
        last_name: lastName,
        email: faker.internet.email(firstName, lastName),
      });
    } catch (error) {
      console.log(error);
    }
  }
};

exports.generatePosts = async function (numberOfPosts) {
  try {
    const users = await Users.findAll();
    const userIds = users.map((user) => user.id);
    for (let i = 0; i < userIds.length; i++) {
      for (let t = 0; t < numberOfPosts; t++) {
        Posts.create({
          content: faker.lorem.words(10),
          user_id: userIds[i],
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.generateReactions = async function (numberOfReactions) {
  const posts = await Posts.findAll();
  const postsIds = posts.map((post) => post.id);

  const users = await Users.findAll();
  const usersID = users.map((user) => user.id);

  for (let i = 0; i < posts.length; i++) {
    for (let t = 0; t < numberOfReactions; t++) {
      let typeGenerate = "LIKE";
      if (Math.floor(Math.random() * 2) === 1) typeGenerate = "DISLIKE";
      Reactions.create({
        type: typeGenerate,
        post_id: postsIds[i],
        user_id: usersID[t],
      });
    }
  }
};

exports.generateReports = async function (numberOfReports) {
  const posts = await Posts.findAll();
  const postsIds = posts.map((post) => post.id);

  const users = await Users.findAll();
  const usersID = users.map((user) => user.id);
  let incr = 0;
  while (incr < numberOfReports) {

    const randomPostId = postsIds[Math.floor(Math.random() * postsIds.length)];
    const randomUserId = usersID[Math.floor(Math.random() * usersID.length)];

    const reportExist = await Reports.findOne({
      where: { post_id: randomPostId, user_id: randomUserId },
    });
    if (!reportExist) {
      Reports.create({
        reason: faker.lorem.words(10),
        post_id: randomPostId,
        user_id: randomUserId,
      });
      incr++;
    }
  }
};
