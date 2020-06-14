import Sequelize from 'sequelize'
import Collection from './Collection'
import Category from './Category'
import Article from './Article'
import path from 'path'

const dbPath = path.resolve('src/database/storage/database.sqlite')
console.log(`DB path: ${dbPath}`)

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: dbPath
})

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

export default db