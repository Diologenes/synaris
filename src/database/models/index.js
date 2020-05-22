const Sequelize = require("sequelize");
const path = require("path")
const dbPath = path.resolve('src/database/storage/database.sqlite')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath
})

const Group = require("./Group");
const Library = require("./Library");

const models = {
  Group: Group.init(sequelize, Sequelize),
  Library: Library.init(sequelize, Sequelize),
};

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize
};

module.exports = db;