const Sequelize = require('sequelize')
const path = require('path')
const dbPath = path.resolve('src/database/storage/database.sqlite')
console.log('dbPath', dbPath)

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: dbPath
})

const Collection = require('./Collection')
const Category = require('./Category')
const Article = require('./Article')

const models = {
	Collection: Collection.init(sequelize, Sequelize),
	Category: Category.init(sequelize, Sequelize),
	Article: Article.init(sequelize, Sequelize)
}

Object.values(models)
	.filter((model) => typeof model.associate === 'function')
	.forEach((model) => model.associate(models))

const db = {
	...models,
	Sequelize,
	sequelize
}

module.exports = db
