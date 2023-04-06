module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "evaldb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 100000,
      idle: 10000
    }
  };