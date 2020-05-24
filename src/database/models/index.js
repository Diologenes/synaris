const Sequelize = require("sequelize");
const path = require("path")
const dbPath = path.resolve('src/database/storage/database.sqlite')
console.log('dbPath', dbPath)

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath
})


console.log('sequelize', sequelize)

const Folder = require("./Folder");
const Library = require("./Library");

const models = {
  Folder: Folder.init(sequelize, Sequelize),
  Library: Library.init(sequelize, Sequelize),
};

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize
};

console.log('db', db)


module.exports = db;