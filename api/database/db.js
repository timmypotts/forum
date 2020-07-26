const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("forumDB", "root", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
  operatorAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
